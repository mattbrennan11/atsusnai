import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API, AWS} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { Auth } from 'aws-amplify'; 
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import FooterExample from './components/Footer';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import uuid from "uuid"
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
Amplify.configure(config);

function ProfileAdmin({user}) {

  const [faqQuestion, setFaqQuestion] = React.useState('')
  const [faqAnswer, setFaqAnswer] = React.useState('')
  const [faqLink, setFaqLink] = React.useState('')
  const [faqButton, setFaqButton] = React.useState('')
  const [faqs, setFAQ] = React.useState([])

  const groups = user.signInUserSession.accessToken.payload["cognito:groups"]

  const handleSubmit = e =>{
    e.preventDefault()

    API.post('faqapi', '/faq', {
      body: {
        uuid: uuid.v1(),
        question: faqQuestion,
        answer: faqAnswer,
        link: faqLink,
        button: faqButton,
      }
    }).then(fetchedFaq => {
      setFAQ([ ... faqs, ... fetchedFaq])
    })
  }

  const handleDelete = e =>{
    e.preventDefault()

    API.del('faqapi', '/faq', {
      body: {
        uuid: uuid.v1(),
        question: faqQuestion,
        answer: faqAnswer,
        link: faqLink,
        button: faqButton,
      }
    }).then(fetchedFaq => {
      setFAQ([ ... faqs, ... fetchedFaq])
    })
  }

useEffect(() =>{
  API.get('faqapi', '/faq/uuid').then((faqRes) =>{
    setFAQ([...faqs, ...faqRes]);
  });
  },[]);
  if(groups.includes('Admin')){

 return (
  
    <div className="Faqs">
      
        <NavExample/>
      <div>
      <h1>FAQ</h1>
      </div>

     <img src={require('./faq.jpeg')} width="100%" height="500" />
  
     <h2>Add New FAQ's Below</h2>
     <div className="App-header">
     
     <form onSubmit={handleSubmit} >
     <h6>Question:</h6> <input value={faqQuestion} onChange={(e) => setFaqQuestion(e.target.value)}/>
     <h6>Answer:</h6> <input value={faqAnswer} onChange={(e) => setFaqAnswer(e.target.value)}/>
    <h6> Button:</h6> <input value={faqButton} onChange={(e) => setFaqButton(e.target.value)}/>
<h6>Button Link:</h6> <input value={faqLink} onChange={(e) => setFaqLink(e.target.value)}/>
<br></br>
<Button type="submit"> Add FAQ</Button>
</form>

       
            <div className="FAQs">
             
              </div>
              
          
          </div>
          <FooterExample/>
 
  </div>
    
  );
  }
}
  export default withAuthenticator(ProfileAdmin);
  