import React, { useEffect, useState} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import 'semantic-ui-css/semantic.min.css'
import { Grid,  Form, Segment} from 'semantic-ui-react';
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import uuid from "uuid"
import { Auth } from 'aws-amplify'; 
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FooterExample from './components/Footer';
Amplify.configure(config);

const isEmail = (email)=>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function AntrimAdmin({user}) { 

  //councillors
  const [councillorWebsite, setCouncillorWebsite] = React.useState('')
  const [councillorNumber, setCouncillorNumber] = React.useState('')
  const [councillorEmail, setCouncillorEmail] = React.useState('')
  const [councillorCouncil, setCouncillorCouncil] = React.useState('')
  const [councillorName, setCouncillorName] = React.useState('')
  const [councillorParty, setCouncillorParty] = React.useState('')
  const [councillorUuid, setCouncillorUuid] = React.useState('')
  const [councillors, setCouncillors] = React.useState([])

  const [errors, setErrors] = useState({});
  
  const groups = user.signInUserSession.accessToken.payload["cognito:groups"]

  const handleSubmit = e =>{
    e.preventDefault()

    const errors = {};

  //Councillor Name Error Logic
    if(councillorName.trim() == ""){
      return(
        alert("Name cannot be empty.")
      )
      }

 //Councillor Council Error Logic
      if(councillorCouncil.trim() == ""){
        return(
          alert("Council cannot be empty.")
        )
        }

        if(councillorCouncil != "Antrim and Newtownabbey" && councillorCouncil != "Ards and North Down"
        && councillorCouncil != "Armagh City Banbridge and Craigavon" && councillorCouncil != "Belfast"
        && councillorCouncil != "Causeway Coast and Glens" && councillorCouncil != "Fermanagh and Omagh"
        && councillorCouncil != "Lisburn and Castlereagh" && councillorCouncil != "Mid and East Antrim"
        && councillorCouncil != "Newry Mourne and Down" && councillorCouncil != "Mid Ulster"){
          return(
            alert("Council not valid. Must be in one of the following forms: \nAntrim and Newtownabbey\nArds and North Down\nArmagh City Banbirdge and Craigavon\nBelfast\nCauseway Coast and Glens\nFermanagh and Omagh\nLisburn and Castlereagh\nMid and East Antrim\nNewry Mourne and Down\nMid Ulster")
          )
        }

 //Councillor Email Error Logic
        if(councillorEmail.trim() == ""){
          return(
            alert("Email cannot be empty.")
          )
          }

          if(!isEmail(councillorEmail)){
            return(
              alert("Email not valid.")
            )
            errors.email = "Email not vailid."
          }

 //Councillor Party Error Logic
          if(councillorParty.trim() == ""){
            return(
              alert("Party cannot be empty.")
            )
            }

 //Councillor Number Error Logic
            if(councillorNumber.trim() == ""){
              return(
                alert("Phone number cannot be empty.")
              )
              }

              if(!councillorNumber.match('[0-9]{11}')){
                return(
                alert('Phone number not valid.')
                )
              }

 //Councillor Website Error Logic
              if(councillorWebsite.trim() == ""){
                return(
                  alert("Website cannot be empty.")
                )
                }

    API.post('councillorsapi', '/councillors', {
      body: {
        uuid: uuid.v1(),
        Name: councillorName,
        Council: councillorCouncil,
        Email: councillorEmail,
        Party: councillorParty,
        Telephone: councillorNumber,
        Website: councillorWebsite,
      }
    }).then(fetchedCouncillor => {
      setCouncillors([ ... councillors, ... fetchedCouncillor])
    })
  }

  const handleUpdate = e =>{
    e.preventDefault()

    API.put('councillorsapi', '/councillors', {
      body: {
        uuid: councillorUuid,
        Name: councillorName,
        Council: councillorCouncil,
        Email: councillorEmail,
        Party: councillorParty,
        Telephone: councillorNumber,
        Website: councillorWebsite,
      }
    }).then(fetchedCouncillor => {
      setCouncillors([ ... councillors, ... fetchedCouncillor])
    })
  }

 
  const handleDelete = e =>{
    e.preventDefault()


    API.del('councillorsapi', `/councillors/${councillorUuid}`,  {
     
    }).then(fetchedCouncillor => {
      setCouncillors([ ... councillors, ... fetchedCouncillor])
    })
  }

useEffect(() =>{
  API.get('councillorsapi', '/councillors/uuid').then((councillorRes) =>{
    setCouncillors([...councillors, ...councillorRes]);
  });
  },[]);

  if(groups.includes('Admin')){
  return (
    <div className="Faq">
      <div className="Quiz2">
      <NavExample /> 
      <div>
      <h1>Councillors - Antrim & Newtonabbey</h1>
      </div>
      <div className="Quiz">

        <h2>Create a new councillor</h2>

      <Segment inverted>
 <Form onSubmit={handleSubmit} inverted size='large'>
     <Form.Group>
       <Form.Input font = "Helvetica Neue" name='nickname' required='true' value={councillorName} label='Name' placeholder='Display name' width={10} onChange={(e) => setCouncillorName(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname'required='true' value={councillorCouncil} label='Council' placeholder='Display name' width={10} onChange={(e) => setCouncillorCouncil(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' required='true' value={councillorEmail} label='Email' placeholder='Display name' width={10} onChange={(e) => setCouncillorEmail(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' required='true' value={councillorParty} label='Party'  placeholder='Display name' width={10} onChange={(e) => setCouncillorParty(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' required='true' value={councillorNumber} label='Phone Number' placeholder='Display name' width={10} onChange={(e) => setCouncillorNumber(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' required='true' value={councillorWebsite} label='Website' placeholder='Display name' width={10} onChange={(e) => setCouncillorWebsite(e.target.value)} error={false} />
      </Form.Group>
     <br></br>
     <Button font = "Helvetica Neue" type='submit'>Create Councillor</Button>     
   </Form>
 </Segment>

 <h2>Delete a councillor</h2>

<Segment inverted>
<Form onSubmit={handleDelete} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='nickname' required='true' value={councillorUuid} label='Name' placeholder='Display name' width={10} onChange={(e) => setCouncillorUuid(e.target.value)} error={false} />


</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Delete Councillor</Button>     
</Form>
</Segment>
 
</div>

        <div>

        <h2>Update a councillor</h2>
  <Row lg={3}>
  { 
councillors.map((councillor) => {
  if(councillor.Party == "Sinn Fein"){

  
return (

        <Segment inverted>
<Form onSubmit={handleUpdate} inverted size='large'>
     <Form.Group>
      <h1>{councillor.uuid}</h1>
      <Form.Input font = "Helvetica Neue" name='nickname' value={councillorUuid} label='Uuid' placeholder={councillor.uuid} width={10} onChange={(e) =>  setCouncillorUuid(e.target.value)} error={false} />
      <Form.Input font = "Helvetica Neue" name='nickname' value={councillorName} label='Name' placeholder={councillor.name} width={10} onChange={(e) =>  setCouncillorName(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' value={councillorCouncil} label='Council' placeholder='bla' width={10} onChange={(e) => setCouncillorCouncil(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' value={councillorEmail} label='Email' placeholder='Display name' width={10} onChange={(e) => setCouncillorEmail(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' value={councillorParty} label='Party'  placeholder='Display name' width={10} onChange={(e) => setCouncillorParty(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' value={councillorNumber} label='Phone Number' placeholder={councillor.phone_number} width={10} onChange={(e) => setCouncillorNumber(e.target.value)} error={false} />
       <Form.Input font = "Helvetica Neue" name='nickname' value={councillorWebsite} label='Website' placeholder='Display name' width={10} onChange={(e) => setCouncillorWebsite(e.target.value)} error={false} />
      </Form.Group>
     <br></br>
     <Button font = "Helvetica Neue" type='submit'>Update Councillor</Button>     
   </Form>
 
 </Segment>

);}
})   }
</Row>
           



</div>
      <FooterExample />
      </div>
      
    </div>
     
  );
}}

export default withAuthenticator(AntrimAdmin);

