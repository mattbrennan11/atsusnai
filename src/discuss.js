import React, { useEffect, useState} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import 'semantic-ui-css/semantic.min.css'
import { Grid,  Form, Segment} from 'semantic-ui-react';
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
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

  //Setting the comments attributes for DB
  const [discussComment, setDiscussComment] = React.useState('')
  const [commentCouncil, setCommentCouncil] = React.useState('')
  const [userNickName, setUserNickName] = React.useState('')
  const [comments, setComments] = React.useState([])

   //setting user input to search by party
   const [userInput, setUserInput] = React.useState('')

  //API call to get comments from DynamoDB
  useEffect(() =>{
    API.get('discussionapi', '/discussion/uuid').then((commentRes) =>{
      setComments([...comments, ...commentRes]);
    });
    },[]); 

//Handling the input comment and posting it to DB using API
  const handleSubmit = (e) =>{
    e.preventDefault()


if(discussComment == ""){
  return(
    alert("Comment cannot be empty")
  )
}

    API.post('discussionapi', '/discussion', {
      
      body: {
        uuid: uuid.v1(),
        comment : discussComment,
        council: commentCouncil,
        date : format(new Date(), 'yyyy/MM/dd'),
        time: format(new Date(), 'HH:mm'),
        nickname : user.attributes.nickname,
        userIdentification: user.attributes.sub,
      }
    }).then(fetchedComment => {
      setComments([ ... comments, ... fetchedComment])
    })
  }
 
 return (
   
<div className="Quiz2">

<NavExample/>


  <div>
<h1>Political Discussions</h1>
</div>
<div className="Img">
<img src={require('./discussions.jpeg')} width="100%" height="500" padding-bottom="10px" />
</div>

<section style={{ backgroundColor: "black" }}>
<div>
<Segment inverted>
  <Form.Group>
  <Form inverted>
    <h2>Enter a council in the search bar below to find council discussion page</h2>
    <Form.Input name="userInput" label="Enter Party" value={userInput} width={4} onChange={(e) => setUserInput(e.target.value)}/>
    </Form>
    </Form.Group>
    </Segment>
    </div>
    
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
              //Loops through the DynamoDB discussion table
              comments.map((title) =>{

                if(title.council == userInput){
                
  return( 
               
              <div className="d-flex flex-start">
                <div> 
                <h5>--------------------------------------------------------------------------------------------------------------------------------------------------------</h5>
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
              </div> ) }     } )}

    <form onSubmit={handleSubmit} >
<input value={discussComment} onChange={(e) => setDiscussComment(e.target.value)}/>
<Button type="submit">Add comment</Button>
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

export default withAuthenticator(Discuss);


//if(title.userIdentification == user.attributes.sub){