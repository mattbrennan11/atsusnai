import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
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
  

  const [partyName, setPartyName] = React.useState('')
  const [partyWebsite, setPartyWebsite] = React.useState('')
  const [partyAddress, setPartyAddress] = React.useState('')
  const [partyDescription, setPartyDescription] = React.useState('')
  const [partyEmail, setPartyEmail] = React.useState('')
  const [partyNumber, setPartyNumber] = React.useState('')
  const [partyGmap, setPartyGmap] = React.useState('')
  const [policyOne, setPolicyOne] = React.useState('')
  const [policyTwo, setPolicyTwo] = React.useState('')
  const [policyThree, setPolicyThree] = React.useState('')
  const [parties, setParties] = React.useState([])

  const groups = user.signInUserSession.accessToken.payload["cognito:groups"]

  
  const handleSubmit = e =>{
    e.preventDefault()

    API.post('partyapi', '/adminparty', {
      body: {
        uuid: uuid.v1(),
        name: partyName,
        website: partyWebsite,
        address: partyAddress,
        policy_one: policyOne,
        policy_two: policyTwo,
        policy_three: policyThree,
        email: partyEmail,
        phone_number: partyNumber,
        gmap: partyGmap,
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
       <NavExample/>
       <div>
       <h1>Political Parties</h1>
       </div>
       <div className="Img">
       <img src={require('./stormont.jpg')} width="100%" height="500" padding-bottom="10px"  />
       </div>
      <div className="App-header">

      <form onSubmit={handleSubmit} >
     <h6>Name:</h6> <input value={partyName} onChange={(e) => setPartyName(e.target.value)}/>
     <h6>Address:</h6> <input value={partyAddress} onChange={(e) => setPartyAddress(e.target.value)}/>
    <h6>Email:</h6> <input value={partyEmail} onChange={(e) => setPartyEmail(e.target.value)}/>
<h6>Policy One:</h6> <input value={policyOne} onChange={(e) => setPolicyOne(e.target.value)}/>
<h6>Policy Two:</h6> <input value={policyTwo} onChange={(e) => setPolicyTwo(e.target.value)}/>
<h6>Policy Three:</h6> <input value={policyThree} onChange={(e) => setPolicyThree(e.target.value)}/>
<h6>GMAP:</h6> <input value={partyGmap} onChange={(e) => setPartyGmap(e.target.value)}/>
<h6>Phone Number:</h6> <input value={partyNumber} onChange={(e) => setPartyNumber(e.target.value)}/>
<h6>Website:</h6> <input value={partyWebsite} onChange={(e) => setPartyWebsite(e.target.value)}/>

<br></br>
<Button type="submit"> Add Party</Button>
</form>

     
     <br></br>
    
       <Row lg={3} md={2}>
  {
        parties.map((party) => {
         
      return (
        <Col className="d-flex">
          <Card className="" style={{width: '60rem'}}>
          <Card.Img variant="top" width="60px" height="280px" src={party.img} />
            <Card.Header>{party.name}
            </Card.Header>
            <Card.Body>
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