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

   const [commentInput, setCommentInput] = React.useState('')

   const [councilInput, setCouncilInput] = React.useState('')



  //API call to get comments from DynamoDB
  useEffect(() =>{
    API.get('discussionapi', '/discussion/uuid').then((commentRes) =>{
      setComments([...comments, ...commentRes]);
    });
    },[]); 

//Handling the input comment and posting it to DB using API
  const handleSubmit = (e) =>{
    e.preventDefault()

    API.post('discussionapi', '/discussion', {
      
      body: {
        uuid: uuid.v1(),
        comment : commentInput,
        council: councilInput,
        date : format(new Date(), 'yyyy/MM/dd'),
        time: format(new Date(), 'HH:mm'),
        nickname : user.attributes.nickname,
        userIdentification: user.attributes.sub,
      }
    }).then(fetchedComment => {
      setComments([ ... comments, ... fetchedComment])
    })
  }

//delete
  const handleDelete = (e) =>{
    e.preventDefault()

    API.del('discussionapi', '/discussion', {
      
      body: {
        uuid: uuid.v1(),
        comment : commentInput,
        council: councilInput,
        date : format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'HH:mm:ss'),
        nickname : user.attributes.nickname,
        userIdentification: user.attributes.sub,
      }
    }).then(fetchedComment => {
      setComments([ ... comments, ... fetchedComment])
    })
  }
 
 return (
<div className="Faq">
  <div className="Quiz2">
<NavExample/>

  <div>
<h1>Political Discussions</h1>
</div>

<div>
<Segment inverted>
<Form  inverted>
  <Form.Group>
<Form.Input name="discussComment" label="Find Council" value={userInput} width={4} onChange={(e) => setUserInput(e.target.value)}/>
</Form.Group>
 <br></br> 
</Form>
</Segment>
</div>




<section style={{ backgroundColor: "black" }}>


{
              //Loops through the DynamoDB discussion table
              comments.map((title) =>{

                if(title.council == userInput){
                
  return( 
<>
    

    <MDBContainer className="py-5" style={{ maxWidth: "1000px" ,height: "100%"}}>
      <MDBRow className="justify-content-center">
        <MDBCol md="12" lg="10">
          <MDBCard className="text-dark">
            <MDBCardBody className="p-4">
              <MDBTypography tag="h2" className="mb-0">
              </MDBTypography>
              <br></br>
     
   
              <div className="d-flex flex-start">
       
     
                <div> 
                  <MDBTypography className="fw-bold mb-1">
              
                    <h2>{title.nickname}</h2>

                  </MDBTypography>
                  <div className="d-flex align-items-center mb-3">
                  <div className="mb-0">
                      <h6>{title.comment}</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                   
                    <p className="mb-0">
                    {moment(title.date).month(moment(title.date).month()).fromNow()}
                    {moment.utc(title.date + title.time).local().startOf('seconds').fromNow()}


                    </p>
                    </div>  
                </div>
              </div>
             
            </MDBCardBody>
          </MDBCard>
        </MDBCol> 
      
      </MDBRow>
     
    </MDBContainer></>
 ) }     } )}
  </section>


  <div>
<Segment inverted>
<Form onSubmit={handleSubmit} inverted>
<Form.Group>
<Form.Input name="discussComment" label="Comment" value={commentInput} width={8} onChange={(e) => setCommentInput(e.target.value)}/>
<Form.Input name="userInput" label="Council" value={councilInput} width={8} onChange={(e) => setCouncilInput(e.target.value)}/>

</Form.Group>
 <br></br> 
 <Button font = "Helvetica Neue" type='submit'>Add Comment</Button>     
</Form>
</Segment>
</div>


    <FooterExample/>
    </div>
 </div>
);
}

export default withAuthenticator(Discuss);


//if(title.userIdentification == user.attributes.sub){

/** 
<div>
<Segment inverted>
<Form onSubmit={handleSubmit} inverted size='large'>
  <Form.Group>
<Form.Input name="discussComment" label="Comment" value={userInput} width={8} onChange={(e) => setDiscussComment(e.target.value)}/>
<Form.Input name="userInput" label="Council" value={userInput} width={8} onChange={(e) => setCommentCouncil(e.target.value)}/>
</Form.Group>
 <br></br>
 <Button font = "Helvetica Neue" type='submit'>Add Comment</Button>     
</Form>
</Segment>
</div>*/