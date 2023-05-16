import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import 'semantic-ui-css/semantic.min.css'
import Card from 'react-bootstrap/Card';
import { Form, Segment} from 'semantic-ui-react';
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import Button from 'react-bootstrap/Button';
import  moment  from 'moment'
import uuid from "uuid"
import Col from 'react-bootstrap/Col';
import FooterExample from './components/Footer';
import { format } from 'date-fns'
Amplify.configure(config);

function Discuss({user}) {

  //Setting the comments attributes for DB
  const [commentInput, setCommentInput] = React.useState('')
   const [councilInput, setCouncilInput] = React.useState('')
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

     //Comment empty error logic
     if(commentInput.trim() === ""){
      return(
        alert("Comment cannot be empty.")
      )
      }

      //Council not valid logic
        if(councilInput !== "Antrim and Newtownabbey" && councilInput !== "Ards and North Down"
        && councilInput !== "Armagh City Banbridge and Craigavon" && councilInput !== "Belfast"
        && councilInput !== "Causeway Coast and Glens" && councilInput !== "Fermanagh and Omagh"
        && councilInput !== "Lisburn and Castlereagh" && councilInput !== "Mid and East Antrim"
        && councilInput !== "Newry Mourne and Down" && councilInput !== "Mid Ulster"){
          return(
            alert("Council not valid. Must be in one of the following forms: \nAntrim and Newtownabbey\nArds and North Down\nArmagh City Banbirdge and Craigavon\nBelfast\nCauseway Coast and Glens\nFermanagh and Omagh\nLisburn and Castlereagh\nMid and East Antrim\nNewry Mourne and Down\nMid Ulster")
          )
        }

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
    })
  }

/** delete function - further improvement
  const handleDelete = (e) =>{
    e.preventDefault()

    API.del('discussionapi', '/discussion', {
    
    }).then(fetchedComment => {
      setComments([ ... comments, ... fetchedComment])
    })
  }*/
 
 return (
<div className="Faq">
  <div className="Quiz2">
<NavExample/>

  <div>
<h1>Political Discussions</h1>
</div>

<div>
<Segment inverted>
<Form.Group>
<Form inverted>
    <div className="App-header2">
      <h2>Find Council</h2>
      <h2>Options: Antrim and Newtownabbey, Ards and North Down, 
        Armagh City Banbirdge and Craigavon, Belfast, Causeway Coast and Glens, 
        Fermanagh and Omagh, Lisburn and Castlereagh, 
        Mid and East Antrim, Newry Mourne and Down, Mid Ulster</h2>
<Form.Input name="discussComment" value={userInput} width={4} onChange={(e) => setUserInput(e.target.value)}/>
</div>

 
</Form></Form.Group>
</Segment>
</div>

<h2>Comments</h2>

<section style={{ backgroundColor: "black" }}>

<div className="App-header">
              
  {comments.map((title, i) =>{
     if(title.council === userInput|| title.council.toLowerCase() === userInput 
     || title.council.toUpperCase() === userInput){
                 
  return( 
    
<div className="FAQs" key={i}>
 
<Col className="d-flex" key={i}>
          <Card className="flex-fill mt-3" style={{width: '50rem'}} key={i}>
            <Card.Header>{title.nickname}</Card.Header>
            <Card.Body> 
            <Card.Text>{title.comment}</Card.Text>
            </Card.Body>
            <Card.Footer>{title.date}</Card.Footer>
          </Card>
          </Col>
      </div>
    
 ) }  } )}  </div> 
  </section>


  

<h2>Comment below on anything from local council issues to party policies...</h2>
 
  <div>
<Segment inverted>
<Form.Group>
<Form onSubmit={handleSubmit} inverted size="large">
<div className="App-header3">
<Form.Input name="discussComment" required={true} label="Comment" 
value={commentInput} width={12} onChange={(e) => setCommentInput(e.target.value)}/>
<Form.Input name="userInput" required={true} label="Council" 
value={councilInput} width={12} onChange={(e) => setCouncilInput(e.target.value)}/>
 <br></br> 
 <Button variant='primary' font = "Helvetica Neue" type='submit'>Add Comment</Button>  </div>   
</Form>
</Form.Group>
</Segment>
</div>

    <FooterExample/>
    </div>
 </div>
);
}

export default withAuthenticator(Discuss);


/** update discussion
 <h2>Your Comments</h2>

  <div className="App-header3">
          {comments.map((title, i) =>{
           
                if((title.userIdentification === user.attributes.sub) && (title.council === userInput|| title.council.toLowerCase() === userInput || title.council.toUpperCase() === userInput)){
                
  return( 
<div className="FAQs" key={i}>

          <Card className="flex-fill mt-3" style={{width: '60rem'}} key={i}>
            <Card.Header>{title.nickname}</Card.Header>
            <Card.Body> 
            <Card.Text>{title.comment}</Card.Text>
            
              <Card.Header>   {moment(title.date).month(moment(title.date).month()).fromNow()}</Card.Header>
            
            </Card.Body>
          </Card>
      
    </div>
            
 ) }  } )}  </div> 
 */