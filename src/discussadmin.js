import React, { useEffect, useState} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import {  Form } from 'semantic-ui-react';
import  AWS  from 'aws-sdk'
import Button from 'react-bootstrap/Button';
import  moment  from 'moment'
import { Auth } from 'aws-amplify'; 
import uuid from "uuid"
import FooterExample from './components/Footer';
import { format } from 'date-fns'
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
Amplify.configure(config);

function Discuss({user}) {

  const [irelandComment, setIrelandComment] = React.useState('')
  const [irelandId, setIrelandId] = React.useState('')
  const [userNickName, setUserNickName] = React.useState('')
  const [comments, setComments] = React.useState([])

  const groups = user.signInUserSession.accessToken.payload["cognito:groups"]
 
  useEffect(() =>{
    API.get('unitedirelandapi', '/unitedireland/comment').then((commentRes) =>{
      setComments([...comments, ...commentRes]);
    });
    },[]); 

  const handleSubmit = (e) =>{
    e.preventDefault()

    API.post('unitedirelandapi', '/unitedireland', {
      
      body: {
        uuid: uuid.v1(), //sets random uuid
        comment : irelandComment,
        date : format(new Date(), 'yyyy/MM/dd'),
        time: format(new Date(), 'HH:mm'),
        nickname : user.attributes.nickname,
        userIdentification: user.attributes.sub,
      }
    }).then(fetchedComment => {
      setComments([ ... comments, ... fetchedComment])
    })
  }
  if(groups.includes('Admin')){
 return (
   
<div className="Quiz2">

<NavExample/>

<section style={{ backgroundColor: "black" }}>
<h1>Political Discussions</h1>
<img src={require('./discussions.jpeg')} width="100%" height="500" padding-bottom="10px" />

    <MDBContainer className="py-5" style={{ maxWidth: "1000px" ,height: "100%"}}>
      <MDBRow className="justify-content-center">
        <MDBCol md="12" lg="10">
          <MDBCard className="text-dark">
            <MDBCardBody className="p-4">
              <MDBTypography tag="h2" className="mb-0">
                Do you think a United Ireland is a feasible option?
              </MDBTypography>
              <br></br>
      {
              comments.map((title) =>{
                if(title.userIdentification == user.attributes.sub ){
  return(
               
              <div className="d-flex flex-start">
                <div> 
                <h5>---------------</h5>
                  <MDBTypography tag="h6" className="fw-bold mb-1">
                    <h6>{title.nickname}</h6>

                  </MDBTypography>
                  <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">
                    {moment(title.date).month(moment(title.date).month()).fromNow()}
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">
                      <h6>{title.comment}</h6>
                    </p>
                    </div>  
                </div>
                
            
              </div> )} }      )}

              <form onSubmit={handleSubmit} >
<input value={irelandComment} onChange={(e) => setIrelandComment(e.target.value)}/>
<Button type="submit"> Add comment</Button>
</form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol> 
      </MDBRow>
    </MDBContainer>
  </section>

    <FooterExample/>
    </div>

);



 }

}

export default withAuthenticator(Discuss);