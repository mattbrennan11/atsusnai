import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import 'semantic-ui-css/semantic.min.css'
import { Form, Segment} from 'semantic-ui-react';
import FooterExample from './components/Footer';
import Card from 'react-bootstrap/Card';
import uuid from "uuid"
import Button from 'react-bootstrap/Button';
Amplify.configure(config);

function FAQAdmin({user}) {

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

    try{
    API.post('faqapi', '/faq', {
      body: {
        uuid: uuid.v1(),
        question: faqQuestion,
        answer: faqAnswer,
        link: faqLink,
        button: faqButton,
      }
    })

  } catch{
    console.log('')
  }

    return(
      alert('FAQ Created') 
    )
    
  }
/** 
  const handleDelete = e =>{
    e.preventDefault()

    API.del('faqapi', `/faq/uuid/${faqUuid}`)
    return(
      alert('FAQ Deleted'),
      window.location.reload(false)
    )
  }*/

  const handleUpdate = e =>{
    e.preventDefault()

    API.put('faqapi', '/faq', {
      body: {
        uuid: updateFaqUuid,
        question: updateFaqQuestion,
        answer: updateFaqAnswer,
        link: updateFaqLink,
        button: updateFaqButton,
      }
    })

    return(
      alert('FAQ Updated')
    )
  }

useEffect(() =>{
  API.get('faqapi', '/faq/uuid').then((faqRes) =>{
    setFAQ([...faqs, ...faqRes]);
  });
  },[]);

  try{
  if(groups.includes('Admin')){

 return (
  
    <div className="Faq">
      <div className="Quiz2">
      
        <NavExample/>
      <div>
      <h1>FAQ</h1>
      </div>

  <div className="Quiz">
 <h2>Create FAQ</h2>
   
     <Segment inverted>
 <Form onSubmit={handleSubmit} inverted size='large'>
     <Form.Group>
       <Form.Input font = "Helvetica Neue" name='question' required={true} value={faqQuestion} label='Question' placeholder='How do I apply for an electoral card?' width={10} onChange={(e) => setFaqQuestion(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='answer'required={true} value={faqAnswer} label='Answer' placeholder='By clicking the button below' width={10} onChange={(e) => setFaqAnswer(e.target.value)} error={false} />
       </Form.Group>
       <Form.Group>
       <Form.Input font = "Helvetica Neue" name='button' required={true} value={faqButton} label='Button Title' placeholder='Order Card' width={10} onChange={(e) => setFaqButton(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='link' required={true} value={faqLink} label='Link'  placeholder='order.com' width={10} onChange={(e) => setFaqLink(e.target.value)} error={false} />
      </Form.Group>
     <br></br>
     <Button font = "Helvetica Neue" type='submit'>Create FAQ</Button>     
   </Form>
 </Segment>

 <h2>Update FAQ</h2>

 <Segment inverted>
<Form onSubmit={handleUpdate} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='uuid' required={true} value={updateFaqUuid} label='ID' placeholder='580853503' width={8} onChange={(e) => setUpdateFaqUuid(e.target.value)} error={false} />
</Form.Group>
<Form.Group>
       <Form.Input font = "Helvetica Neue" name='question' required={true} value={updateFaqQuestion} label='Question' placeholder='How do I order an electoral cards?' width={10} onChange={(e) => setUpdateFaqQuestion(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='answer'required={true} value={updateFaqAnswer} label='Answer' placeholder='By clicking button below' width={10} onChange={(e) => setUpdateFaqAnswer(e.target.value)} error={false} />
       </Form.Group>
       <Form.Group>
       <Form.Input font = "Helvetica Neue" name='button' required={true} value={updateFaqButton} label='Button Title' placeholder='Order Card' width={10} onChange={(e) => setUpdateFaqButton(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='link' required={true} value={updateFaqLink} label='Link'  placeholder='order.com' width={10} onChange={(e) => setUpdateFaqLink(e.target.value)} error={false} />
</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Update FAQ</Button>     
</Form>
</Segment>

<h2>View FAQ</h2>

<div className="App-header">
        {faqs.map((faq, i) => 
         
            <div className="FAQs" key={i}>

<Card className="flex-fill mt-3" style={{width: '40rem'}} key={i}>
<Card.Header>ID: {faq.uuid}</Card.Header> 
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
  }  }catch{
    console.error("No access to non admin")
  }
  
  return(
    <div>
    <NavExample/>
    <h2>Incorrect Path - You have no admin access</h2>
    <h2>Use Navbar to return to accessible web pages</h2>
    </div>
    
  )
}
  export default withAuthenticator(FAQAdmin);
  
  /** delete frontend for when further improvement done
<h2>Delete FAQ</h2>

<Segment inverted>
<Form onSubmit={handleDelete} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='id' required={true} value={faqUuid} label='ID' placeholder='4839483' width={4} onChange={(e) => setFaqUuid(e.target.value)} error={false} />
</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Delete FAQ</Button>     
</Form>
</Segment>

   */