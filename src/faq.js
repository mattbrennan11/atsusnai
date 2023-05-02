import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import FooterExample from './components/Footer';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
Amplify.configure(config);

function FAQ() {

  const [faqQuestion, setFaqQuestion] = React.useState('')
  const [partyWebsite, setPartyWebsite] = React.useState('')
  const [partyAddress, setPartyAddress] = React.useState('')
  const [partyDescription, setPartyDescription] = React.useState('')
  const [partyEmail, setPartyEmail] = React.useState('')
  const [partyNumber, setPartyNumber] = React.useState('')
  const [partyGmap, setPartyGmap] = React.useState('')
  const [faqs, setFAQ] = React.useState([])

useEffect(() =>{
  API.get('faqapi', '/faq/uuid').then((faqRes) =>{
    setFAQ([...faqs, ...faqRes]);
  });
  },[]);

 return (
  
    <div className="Faq">
      
      <div className="Quiz2">
        <NavExample/>
      <div>
      <h1>FAQ</h1>
      </div>

    <div className="Img"> 
     <img src={require('./faq.jpeg')} width="100%" height="500"padding-bottom="10px" />
 </div>

     <div className="App-header">

     
        {faqs.map((faq) => 
         
            <div className="FAQs">
              

<Card className="" style={{width: '60rem'}}>

      <Card.Header>{faq.question}</Card.Header>
      <Card.Body>
        <Card.Text className="text-black">
{faq.answer}      
  </Card.Text>
        <Button href={faq.link} variant="primary">{faq.button}</Button>
      </Card.Body>
    </Card>
    <br></br>
              </div>
              
          )}
          </div>
          <FooterExample/>
 
  </div>

    
  </div>
      
    
  );
  }
  
  export default withAuthenticator(FAQ);
  