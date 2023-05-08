import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import 'semantic-ui-css/semantic.min.css'
import { Form, Segment} from 'semantic-ui-react';
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import FooterExample from './components/Footer';
import uuid from "uuid"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
Amplify.configure(config);

function PartiesAdmin({user}) {
  
  const [partyUuid, setPartyUuid] = React.useState('')
  const [updatePartyUuid, setUpdatePartyUuid] = React.useState('')


  const [partyName, setPartyName] = React.useState('')
  const [partyWebsite, setPartyWebsite] = React.useState('')
  const [partyAddress, setPartyAddress] = React.useState('')
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
      setParties([ ...parties, ...fetchedParty])
    })

    return(
      alert('Party Created'),
      window.location.reload(false)
    )
  }


  
 const handleDelete = e =>{
  e.preventDefault()


  API.del('partyapi', `/party/uuid/${partyUuid}`,  {
   params:{
    uuid: partyUuid,
   }
  }).then(fetchedParty => {
    setParties([ ...parties, ...fetchedParty])
  })

  return(
    alert('Party Deleted'),
    window.location.reload(false)
  )
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
      setParties([ ...parties, ...fetchedParty])
    })

    return(
      alert('Party Updated'),
      window.location.reload(false)
    )
  }

useEffect(() =>{
  API.get('partyapi', '/party/uuid').then((partyRes) =>{
    setParties([...parties, ...partyRes]);
  });
  },);

 try{
  if(groups.includes('Admin')){

 return (
   
    <div className="Faq">
       <div className="Quiz2">
       <NavExample/>
       <div>
       <h1>Political Parties</h1>
       </div>
     
      
     
<div className="Quiz">

      <h2>Create Political Party</h2>

<Segment inverted>
<Form onSubmit={handleSubmit} inverted size='large'>
<Form.Group>
 <Form.Input font = "Helvetica Neue" name='name' required={true} value={partyName} label='Name' placeholder='Sinn Fein' width={10} onChange={(e) => setPartyName(e.target.value)} />
 <Form.Input font = "Helvetica Neue" name='council'required={true} value={partyAddress} label='Address' placeholder='Belfast' width={10} onChange={(e) => setPartyAddress(e.target.value)} />
 <Form.Input font = "Helvetica Neue" name='email' required={true} value={partyEmail} label='Email' placeholder='sinnfein@hotmsil.com' width={10} onChange={(e) => setPartyEmail(e.target.value)} />
 </Form.Group>
 <Form.Group>
 <Form.Input font = "Helvetica Neue" name='gmap' required={true} value={partyGmap} label='Gmap' placeholder='' width={10} onChange={(e) => setPartyGmap(e.target.value)}  />
 <Form.Input font = "Helvetica Neue" name='number' required={true} value={partyNumber} label='Phone Number' placeholder='07549870334' width={10} onChange={(e) => setPartyNumber(e.target.value)} />
 <Form.Input font = "Helvetica Neue" name='website' required={true} value={partyWebsite} label='Website' placeholder='sf.com' width={10} onChange={(e) => setPartyWebsite(e.target.value)}  />
 <Form.Input font = "Helvetica Neue" name='img' required={true} value={partyImg} label='Image' placeholder='Display name' width={10} onChange={(e) => setPartyImg(e.target.value)}  />

</Form.Group>
<Form.Group>
 <Form.Input font = "Helvetica Neue" name='policy1' required={true} value={policyOne} label='Policy One'  placeholder='Protect NHS' width={10} onChange={(e) => setPartyPolicyOne(e.target.value)} />
 <Form.Input font = "Helvetica Neue" name='policy2' required={true} value={policyTwo} label='Policy Two' placeholder='Raise Taxes' width={10} onChange={(e) => setPartyPolicyTwo(e.target.value)}  />
 <Form.Input font = "Helvetica Neue" name='policy3' required={true} value={policyThree} label='Policy Three' placeholder='Support Refugees' width={10} onChange={(e) => setPartyPolicyThree(e.target.value)}  />
 </Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Create Party</Button>     
</Form>
</Segment>

<h2>Delete Political Party</h2>


<Segment inverted>
<Form onSubmit={handleDelete} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='uuid' required={true} value={partyUuid} label='ID' placeholder='Display name' width={4} onChange={(e) => setPartyUuid(e.target.value)}  />
</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Delete Party</Button>     
</Form>
</Segment>

<h2>Update Political Party</h2>


<Segment inverted>
<Form onSubmit={handleUpdate} inverted size='large'>
<Form.Group>
<Form.Input font = "Helvetica Neue" name='id' required={true} value={updatePartyUuid} label='ID' placeholder='85385038' width={10} onChange={(e) => setUpdatePartyUuid(e.target.value)}  />
<Form.Input font = "Helvetica Neue" name='name' required={true} value={updatePartyName} label='Name' placeholder='Sinn Fein' width={10} onChange={(e) => setUpdatePartyName(e.target.value)} />
 <Form.Input font = "Helvetica Neue" name='council'required={true} value={updatePartyAddress} label='Address' placeholder='26 Rouken Glen, Belfast, BT1 5GH' width={10} onChange={(e) => setUpdatePartyAddress(e.target.value)}  />
 <Form.Input font = "Helvetica Neue" name='email' required={true} value={updatePartyEmail} label='Email' placeholder='sf@hotmail.com' width={10} onChange={(e) => setUpdatePartyEmail(e.target.value)}  />
</Form.Group>
<Form.Group>
 <Form.Input font = "Helvetica Neue" name='gmap' required={true} value={updatePartyGmap} label='Gmap' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyGmap(e.target.value)}  />
 <Form.Input font = "Helvetica Neue" name='number' required={true} value={updatePartyNumber} label='Phone Number' placeholder='07549870334' width={10} onChange={(e) => setUpdatePartyNumber(e.target.value)} />
 <Form.Input font = "Helvetica Neue" name='website' required={true} value={updatePartyWebsite} label='Website' placeholder='sf.com' width={10} onChange={(e) => setUpdatePartyWebsite(e.target.value)} />
 <Form.Input font = "Helvetica Neue" name='img' required={true} value={updatePartyImg} label='Website' placeholder='Display name' width={10} onChange={(e) => setUpdatePartyImg(e.target.value)}  />

</Form.Group>
<Form.Group>
 <Form.Input font = "Helvetica Neue" name='policy1' required={true} value={updatePolicyOne} label='Policy One'  placeholder='Protect NHS' width={10} onChange={(e) => setUpdatePolicyOne(e.target.value)} />
 <Form.Input font = "Helvetica Neue" name='policy2' required={true} value={updatePolicyTwo} label='Policy Two' placeholder='Raise Taxes' width={10} onChange={(e) => setUpdatePolicyTwo(e.target.value)}  />
 <Form.Input font = "Helvetica Neue" name='policy3' required={true} value={updatePolicyThree} label='Policy Three' placeholder='Support Refugees' width={10} onChange={(e) => setUpdatePolicyThree(e.target.value)}  />


</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Update Party</Button>     
</Form>
</Segment>

<h2>View Political Parties</h2>

    
    
   
     <div className="App-header">
   
       <Row lg={3} md={2}>
  { 
        parties.map((party, i) => {
         
      return (
        <Col className="d-flex" key={i}>
          <Card className="flex-fill mt-3" style={{width: '60rem'}}>
          <Card.Img key={party.img} variant="top" width="60px" height="280px" src={party.img} />
          <Card.Header key={party.uuid}>ID: {party.uuid}
            </Card.Header>
            <Card.Body>
            <Card.Header key={party.name}>{party.name}
            
            </Card.Header>
            <br></br>
              <Card.Header>
              Key Policies
              </Card.Header>
              <br></br>
              <Card.Text key={party.policyone}>
               1. {party.policyone}
                </Card.Text>
                <Card.Text key={party.policytwo}>
                2. {party.policytwo}
                </Card.Text>
                <Card.Text key={party.policythree}>
                3. {party.policythree}
                </Card.Text>
                  <Card.Header>
              Contact
              </Card.Header>
              <br></br>
              <Card.Text key={party.email}>
               Email: {party.email}
                </Card.Text>
                <Card.Text key={party.phone_number}>
                Telephone: {party.phone_number}
                </Card.Text>
                <Card.Text key={party.address}>
                Address: {party.address}
                </Card.Text>
                 
      
         

 
            </Card.Body>
            <Card.Footer>
       
        <Button key={party.website} href={party.website} variant="primary">Visit Website</Button>
     
      </Card.Footer>
            
          </Card>
          <br></br>
          </Col>
       
      
      );
    })}
    
</Row>




</div>


</div></div>

         
          <FooterExample/>
 </div>
  
    
  
);
}} catch{
  console.error()
}



}

export default withAuthenticator(PartiesAdmin);

/** 
<div className="container-fluid map-col">
<div className="col-md-12 col-sm-12 map-col">
  <div className="google-maps">
    <div className="map-wrap">
      <iframe key={party.gmap} width="100%" height="200" src={party.gmap} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  </div>
</div>

</div>*/