import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import 'semantic-ui-css/semantic.min.css'
import { Form, Segment} from 'semantic-ui-react';
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import AdminNav from './components/AdminNavbar'

import FooterExample from './components/Footer';
import uuid from "uuid"
import { Auth } from 'aws-amplify'; 
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
Amplify.configure(config);

function PartiesAdmin({user}) {
  
  const [partyUuid, setPartyUuid] = React.useState('')
  const [updatePartyUuid, setUpdatePartyUuid] = React.useState('')


  const [partyName, setPartyName] = React.useState('')
  const [partyWebsite, setPartyWebsite] = React.useState('')
  const [partyAddress, setPartyAddress] = React.useState('')
  const [partyDescription, setPartyDescription] = React.useState('')
  const [partyEmail, setPartyEmail] = React.useState('')
  const [partyNumber, setPartyNumber] = React.useState('')
  const [partyGmap, setPartyGmap] = React.useState('')
  const [policyOne, setPartyPolicyOne] = React.useState('')
  const [policyTwo, setPartyPolicyTwo] = React.useState('')
  const [policyThree, setPartyPolicyThree] = React.useState('')
  const [partyImg, setPartyImg] = React.useState('')


  const [updatePartyName, setUpdatePartyName] = React.useState('')
  const [updatePartyWebsite, setUpdatePartyWebsite] = React.useState('')
  const [updatePartyAddress, setUpdatePartyAddress] = React.useState('')
  const [updatePartyDescription, setUpdatePartyDescription] = React.useState('')
  const [updatePartyEmail, setUpdatePartyEmail] = React.useState('')
  const [updatePartyNumber, setUpdatePartyNumber] = React.useState('')
  const [updatePartyGmap, setUpdatePartyGmap] = React.useState('')
  const [updatePolicyOne, setUpdatePolicyOne] = React.useState('')
  const [updatePolicyTwo, setUpdatePolicyTwo] = React.useState('')
  const [updatePolicyThree, setUpdatePolicyThree] = React.useState('')
  const [updatePartyImg, setUpdatePartyImg] = React.useState('')




  const [parties, setParties] = React.useState([])

  const groups = user.signInUserSession.accessToken.payload["cognito:groups"]

  
  const handleSubmit = e =>{
    e.preventDefault()

    API.post('partyapi', '/party', {
      body: {
        uuid: uuid.v1(),
        name: partyName,
        website: partyWebsite,
        address: partyAddress,
        policyone: policyOne,
        policytwo: policyTwo,
        policythree: policyThree,
        email: partyEmail,
        phone_number: partyNumber,
        gmap: partyGmap,
        img: partyImg
      }
    }).then(fetchedParty => {
      setParties([ ... parties, ... fetchedParty])
    })
  }

  const handleDelete = e =>{
    e.preventDefault()


    API.del('partyapi', `/party/${partyUuid}}`,  {
   
    }).then(fetchedParty => {
      setParties([ ...parties, ...fetchedParty])
    })
  }
   
  const handleUpdate = e =>{
    e.preventDefault()

    API.put('partyapi', '/party', {
      body: {
        uuid: updatePartyUuid,
        name: updatePartyName,
        website: updatePartyWebsite,
        address: updatePartyAddress,
        policyone: updatePolicyOne,
        policytwo: updatePolicyTwo,
        policythree: updatePolicyThree,
        email: updatePartyEmail,
        phone_number: updatePartyNumber,
        gmap: updatePartyGmap,
        img: updatePartyImg,
      }
    }).then(fetchedParty => {
      setParties([ ... parties, ... fetchedParty])
    })
  }

useEffect(() =>{
  API.get('partyapi', '/party/uuid').then((partyRes) =>{
    setParties([...parties, ...partyRes]);
  });
  },[]);

 
  if(groups.includes('Admin')){

 return (
   
    <div className="Faq">
       <div className="Quiz2">
       <AdminNav/>
       <div>
       <h1>Political Parties</h1>
       </div>
     
      
     
<div className="Quiz">

      <h2>Create Political Party</h2>

<Segment inverted>
<Form onSubmit={handleSubmit} inverted size='large'>
<Form.Group>
 <Form.Input font = "Helvetica Neue" name='name' required='true' value={partyName} label='Name' placeholder='Display name' width={10} onChange={(e) => setPartyName(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='council'required='true' value={partyAddress} label='Address' placeholder='Display name' width={10} onChange={(e) => setPartyAddress(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='email' required='true' value={partyEmail} label='Email' placeholder='Display name' width={10} onChange={(e) => setPartyEmail(e.target.value)} error={false} />
 </Form.Group>
 <Form.Group>
 <Form.Input font = "Helvetica Neue" name='gmap' required='true' value={partyGmap} label='Gmap' placeholder='Display name' width={10} onChange={(e) => setPartyGmap(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='number' required='true' value={partyNumber} label='Phone Number' placeholder='Display name' width={10} onChange={(e) => setPartyNumber(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='website' required='true' value={partyWebsite} label='Website' placeholder='Display name' width={10} onChange={(e) => setPartyWebsite(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='img' required='true' value={partyImg} label='Website' placeholder='Display name' width={10} onChange={(e) => setPartyImg(e.target.value)} error={false} />

</Form.Group>
<Form.Group>
 <Form.Input font = "Helvetica Neue" name='policy1' required='true' value={policyOne} label='Policy One'  placeholder='Display name' width={10} onChange={(e) => setPartyPolicyOne(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='policy2' required='true' value={policyTwo} label='Policy Two' placeholder='Display name' width={10} onChange={(e) => setPartyPolicyTwo(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='policy3' required='true' value={policyThree} label='Policy Three' placeholder='Display name' width={10} onChange={(e) => setPartyPolicyThree(e.target.value)} error={false} />
 </Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Create Councillor</Button>     
</Form>
</Segment>

<h2>Delete Political Party</h2>


<Segment inverted>
<Form onSubmit={handleDelete} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='nickname' required='true' value={partyUuid} label='ID' placeholder='Display name' width={4} onChange={(e) => setPartyUuid(e.target.value)} error={false} />
</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Delete Councillor</Button>     
</Form>
</Segment>

<h2>Update Political Party</h2>


<Segment inverted>
<Form onSubmit={handleUpdate} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='id' required='true' value={updatePartyUuid} label='ID' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyUuid(e.target.value)} error={false} />
<Form.Input font = "Helvetica Neue" name='name' required='true' value={updatePartyName} label='Name' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyName(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='council'required='true' value={updatePartyAddress} label='Address' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyAddress(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='email' required='true' value={updatePartyEmail} label='Email' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyEmail(e.target.value)} error={false} />
</Form.Group>
<Form.Group>
 <Form.Input font = "Helvetica Neue" name='gmap' required='true' value={updatePartyGmap} label='Gmap' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyGmap(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='number' required='true' value={updatePartyNumber} label='Phone Number' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyNumber(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='website' required='true' value={updatePartyWebsite} label='Website' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyWebsite(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='img' required='true' value={updatePartyImg} label='Website' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyImg(e.target.value)} error={false} />

</Form.Group>
<Form.Group>
 <Form.Input font = "Helvetica Neue" name='policy1' required='true' value={updatePolicyOne} label='Policy One'  placeholder='Display name' width={10} onChange={(e) => setUpdatePolicyOne(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='policy2' required='true' value={updatePolicyTwo} label='Policy Two' placeholder='Display name' width={10} onChange={(e) => setUpdatePolicyTwo(e.target.value)} error={false} />
 <Form.Input font = "Helvetica Neue" name='policy3' required='true' value={updatePolicyThree} label='Policy Three' placeholder='Display name' width={10} onChange={(e) => setUpdatePolicyThree(e.target.value)} error={false} />


</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Update Councillor</Button>     
</Form>
</Segment>
</div>
     <br></br>
     <div className="App-header">
       <Row lg={3} md={2}>
  {
        parties.map((party) => {
         
      return (
        <Col className="d-flex">
          <Card className="flex-fill mt-3" style={{width: '60rem'}}>
          <Card.Img variant="top" width="60px" height="280px" src={party.img} />
          <Card.Header>ID: {party.uuid}
            </Card.Header>
            <Card.Body>
            <Card.Header>{party.name}
            
            </Card.Header>
            <br></br>
              <Card.Header>
              Key Policies
              </Card.Header>
              <br></br>
              <Card.Text>
               1. {party.policyone}
                </Card.Text>
                <Card.Text>
                2. {party.policytwo}
                </Card.Text>
                <Card.Text>
                3. {party.policythree}
                </Card.Text>
                  <Card.Header>
              Contact
              </Card.Header>
              <br></br>
              <Card.Text>
               Email: {party.email}
                </Card.Text>
                <Card.Text>
                Telephone: {party.phone_number}
                </Card.Text>
                <Card.Text>
                Address: {party.address}
                </Card.Text>
                 
           
  <div class="container-fluid map-col">
  <div class="col-md-12 col-sm-12 map-col">
    <div class="google-maps">
      <div class="map-wrap">
        <iframe width="100%" height="200" src={party.gmap} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  </div>
  
</div>
 
            </Card.Body>
            <Card.Footer>
       
        <Button href={party.website} variant="primary">Visit Website</Button>
     
      </Card.Footer>
            
          </Card>
          <br></br>
          </Col>
       
      
      );
    })}
</Row>




</div>


</div>

         
          <FooterExample/>
 </div>
  
    
  
);
}}

export default withAuthenticator(PartiesAdmin);