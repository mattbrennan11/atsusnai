import React, { useEffect, useState} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import 'semantic-ui-css/semantic.min.css'
import { Grid,  Form, Segment} from 'semantic-ui-react';
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FooterExample from './components/Footer';
Amplify.configure(config);


function Lisburn(user) {

  const [councillorWebsite, setCouncillorWebsite] = React.useState('')
  const [councillorNumber, setCouncillorNumber] = React.useState('')
  const [councillorEmail, setCouncillorEmail] = React.useState('')
  const [councillorCouncil, setCouncillorCouncil] = React.useState('')
  const [councillorName, setCouncillorName] = React.useState('')
  const [councillorParty, setCouncillorParty] = React.useState('')
  const [councillors, setCouncillors] = React.useState([])

   //setting user input to search by party
   const [userInput, setUserInput] = React.useState('')

  const handleSubmit = e =>{
    e.preventDefault()

    API.post('councillorsapi', '/councillors', {
      body: {
        name: councillorName,
        council: councillorCouncil,
        email: councillorEmail,
        party: councillorParty,
        phone_number: councillorNumber,
        website: councillorWebsite,
      }
    }).then(fetchedCouncillor => {
      setCouncillors([ ... councillors, ... fetchedCouncillor])
    })
  }

useEffect(() =>{
  API.get('councillorsapi', '/councillors/uuid').then((councillorRes) =>{
    setCouncillors([...councillors, ...councillorRes]);
  });
  },[]);

  return (
    <div className="Faq">
      <div className="Quiz2">
      <NavExample /> 
      <div>
      <h1>Councillors - Lisburn & Castlereagh</h1>
      </div>
      <div className="Quiz">
        <br></br>
<div>
<div>
<Segment inverted>
  <Form.Group>
  <Form inverted>
    <h2>Enter a political party in the search bar below to find councillors</h2>
    <h2>Options: Sinn Fein, Democratic Unionist Party, Social Democratic and Labour Party, Alliance Party of Northern Ireland,
      Ulster Unionist Party, Progressive Unionist Party, Independent, Traditional Unionist Voices, People Before Profit, 
      Cross Community Labour Alternative, Green Party Northern Ireland, Aontu </h2>
      <div className="App-header2">
        <h2>Enter Party</h2>
    <Form.Input name="userInput" value={userInput} width={4} onChange={(e) => setUserInput(e.target.value)}/>
    </div>
    </Form>
    </Form.Group>
    </Segment>
    </div>
        <Row lg={3}>    { 
    councillors.map((councillor) => {
     
      if((councillor.Party == userInput || councillor.Party.toLowerCase() == userInput) && councillor.Council == "Lisburn and Castlereagh"){
      return (
        <Col className="d-flex">
          
          <Card className="flex-fill mt-3">
            <Card.Header>{councillor.Name}</Card.Header>
            <Card.Body>
              <Card.Text>Email: {councillor.Email}</Card.Text>
              <Card.Text>Telephone: {councillor.Telephone}</Card.Text>
              <Card.Text>Party: {councillor.Party}</Card.Text>
              <Card.Text>Council: {councillor.Council}</Card.Text>
              <Button href={councillor.website} variant="primary">Visit Website</Button>
            </Card.Body>
          </Card>
        </Col> 
      
      );}
    })     }
</Row>
</div>

</div>
      <FooterExample />
      </div>
    </div>
     
  );
}

export default withAuthenticator(Lisburn);




  
  