import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { Auth } from 'aws-amplify'; 
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import AdminNav from './components/AdminNavbar'

import 'semantic-ui-css/semantic.min.css'
import { Form, Segment} from 'semantic-ui-react';
import FooterExample from './components/Footer';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import uuid from "uuid"
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
Amplify.configure(config);


function FAQAdmin({user}) {

  const [faqUuid, setFaqUuid] = React.useState('')
  const [faqQuestion, setFaqQuestion] = React.useState('')
  const [faqAnswer, setFaqAnswer] = React.useState('')
  const [faqLink, setFaqLink] = React.useState('')
  const [faqButton, setFaqButton] = React.useState('')


  const [updateFaqUuid, setUpdateFaqUuid] = React.useState('')
  const [updateFaqQuestion, setUpdateFaqQuestion] = React.useState('')
  const [updateFaqAnswer, setUpdateFaqAnswer] = React.useState('')
  const [updateFaqLink, setUpdateFaqLink] = React.useState('')
  const [updateFaqButton, setUpdateFaqButton] = React.useState('')

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

    API.del('faqapi', `/faq/${faqUuid}`, {
    
    
    }).then(fetchedFaq => {
      setFAQ([ ... faqs, ... fetchedFaq])
    })
  }

  const handleUpdate = e =>{
    e.preventDefault()

    API.put('faqapi', '/faq', {
      body: {
        uuid: faqUuid,
        question: faqQuestion,
        answer: faqAnswer,
        link: faqLink,
        button: faqButton,
      }
    }).then(fetchedFaq => {
      setFAQ([ ...faqs, ...fetchedFaq])
    })
  }

useEffect(() =>{
  API.get('faqapi', '/faq/uuid').then((faqRes) =>{
    setFAQ([...faqs, ...faqRes]);
  });
  },[]);
  if(groups.includes('Admin')){

 return (
  
    <div className="Faq">
      <div className="Quiz2">
      
        <AdminNav/>
      <div>
      <h1>FAQ</h1>
      </div>

  <div className="Quiz">
 <h2>Create FAQ</h2>
   
     <Segment inverted>
 <Form onSubmit={handleSubmit} inverted size='large'>
     <Form.Group>
       <Form.Input font = "Helvetica Neue" name='question' required={true} value={faqQuestion} label='Question' placeholder='Display name' width={10} onChange={(e) => setFaqQuestion(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='answer'required={true} value={faqAnswer} label='Answer' placeholder='Display name' width={10} onChange={(e) => setFaqAnswer(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='button' required={true} value={faqButton} label='Button Title' placeholder='Display name' width={10} onChange={(e) => setFaqButton(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='link' required={true} value={faqLink} label='Link'  placeholder='Display name' width={10} onChange={(e) => setFaqLink(e.target.value)} error={false} />
      </Form.Group>
     <br></br>
     <Button font = "Helvetica Neue" type='submit'>Create FAQ</Button>     
   </Form>
 </Segment>

 <h2>Delete FAQ</h2>

<Segment inverted>
<Form onSubmit={handleDelete} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='id' required={true} value={faqUuid} label='ID' placeholder='Display name' width={2} onChange={(e) => setFaqUuid(e.target.value)} error={false} />
</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Delete FAQ</Button>     
</Form>
</Segment>



 <h2>Update FAQ</h2>

 <Segment inverted>
<Form onSubmit={handleUpdate} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='uuid' required={true} value={updateFaqUuid} label='ID' placeholder='Display name' width={10} onChange={(e) => setUpdateFaqUuid(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='question' required={true} value={updateFaqQuestion} label='Question' placeholder='Display name' width={10} onChange={(e) => setUpdateFaqQuestion(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='answer'required={true} value={updateFaqAnswer} label='Answer' placeholder='Display name' width={10} onChange={(e) => setUpdateFaqAnswer(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='button' required={true} value={updateFaqButton} label='Button Title' placeholder='Display name' width={10} onChange={(e) => setUpdateFaqButton(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='link' required={true} value={updateFaqLink} label='Link'  placeholder='Display name' width={10} onChange={(e) => setUpdateFaqLink(e.target.value)} error={false} />
</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Update Councillor</Button>     
</Form>
</Segment>


<h2>View FAQ</h2>

<div className="App-header">
        {faqs.map((faq, i) => 
         
            <div className="FAQs" key={i}>


<Card className="flex-fill mt-3" key={i}>
            <Card.Header>{faq.uuid}</Card.Header>
            <Card.Body> 
            <Card.Text>{faq.question}</Card.Text>
              <Card.Text>{faq.answer}</Card.Text>
              <Button href={faq.link} variant="primary">{faq.button}</Button>
            </Card.Body>
          </Card>
              

              </div>
             
          )}
          </div> </div>
          <FooterExample/>
 </div>
  </div>

      
      
    
  );
  }
}
  export default withAuthenticator(FAQAdmin);
  