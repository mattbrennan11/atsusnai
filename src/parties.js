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
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
Amplify.configure(config);

function Parties() {
  

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

  
  const handleSubmit = e =>{
    e.preventDefault()

    API.post('partyapi', '/adminparty', {
      body: {
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
     
     <br></br>
    
       <Row lg={3} md={2}>
  {
        parties.map((party, i) => {
         
      return (
        <Col className="d-flex" key={i}>
          <Card className="flex-fill mt-3" style={{width: '60rem'}}>
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
}

export default withAuthenticator(Parties);


/** 
<div className="Parties">
<h1>{party.name}</h1>

<div className="insideParty">
<h3>{party.description}</h3>
<img variant="top" width="530px" height="300px" src={party.img} />
<h3>Main Policies</h3>
<ul>
  <li>Policy1:</li>
  <li>Policy1:</li>
  <li>Policy1:</li>
</ul>
<div>
  <Button className="buttonParty" size="sm" href={party.website} variant="primary">Visit Website</Button>
</div>

<h3>Contact</h3>
<h3>Address: {party.address}</h3>
<h3>Email: {party.email}</h3>
<h3>Phone Number: {party.phone_number}</h3>
<div class="container-fluid map-col">
  <div class="col-md-12 col-sm-12 map-col">
    <div class="google-maps">
      <div class="map-wrap">
        <iframe width="530" height="300" src={party.gmap} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  </div>
  
</div>
</div>
<br></br></div>







 </Col>


 <div className="container-fluid map-col">
  <div className="col-md-12 col-sm-12 map-col">
    <div className="google-maps">
      <div className="map-wrap">
        <iframe width="100%" height="200" src={party.gmap} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    </div>
  </div>
  
</div>

)}*/