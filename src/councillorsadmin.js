import React, { useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import 'semantic-ui-css/semantic.min.css'
import { Form, Segment} from 'semantic-ui-react';
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator} from "@aws-amplify/ui-react";
import NavExample from './components/Navbar'
import uuid from "uuid"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FooterExample from './components/Footer';
Amplify.configure(config);

const isEmail = (email)=>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function CouncillorsAdmin({user}) { 

  //councillors - create
  const [councillorWebsite, setCouncillorWebsite] = React.useState('')
  const [councillorNumber, setCouncillorNumber] = React.useState('')
  const [councillorEmail, setCouncillorEmail] = React.useState('')
  const [councillorCouncil, setCouncillorCouncil] = React.useState('')
  const [councillorName, setCouncillorName] = React.useState('')
  const [councillorParty, setCouncillorParty] = React.useState('')
  const [councillorUuid, setCouncillorUuid] = React.useState('')
  const [councillors, setCouncillors] = React.useState([])

//councillors - update
  const [updateCouncillorWebsite, setUpdateCouncillorWebsite] = React.useState('')
  const [updateCouncillorNumber, setUpdateCouncillorNumber] = React.useState('')
  const [updateCouncillorEmail, setUpdateCouncillorEmail] = React.useState('')
  const [updateCouncillorCouncil, setUpdateCouncillorCouncil] = React.useState('')
  const [updateCouncillorName, setUpdateCouncillorName] = React.useState('')
  const [updateCouncillorParty, setUpdateCouncillorParty] = React.useState('')
  const [updateCouncillorUuid, setUpdateCouncillorUuid] = React.useState('')

    //setting user input to search by party
    const [userInput, setUserInput] = React.useState('')

  const groups = user.signInUserSession.accessToken.payload["cognito:groups"]

  const handleSubmit = e =>{
    e.preventDefault()

  //Councillor Name Error Logic
    if(councillorName.trim() === ""){
      return(
        alert("Name cannot be empty.")
      )
      }

 //Councillor Council Error Logic
      if(councillorCouncil.trim() === ""){
        return(
          alert("Council cannot be empty.")
        )
        }

        if(councillorCouncil !== "Antrim and Newtownabbey" && councillorCouncil !== "Ards and North Down"
        && councillorCouncil !== "Armagh City Banbridge and Craigavon" && councillorCouncil !== "Belfast"
        && councillorCouncil !== "Causeway Coast and Glens" && councillorCouncil !== "Fermanagh and Omagh"
        && councillorCouncil !== "Lisburn and Castlereagh" && councillorCouncil !== "Mid and East Antrim"
        && councillorCouncil !== "Newry Mourne and Down" && councillorCouncil !== "Mid Ulster"){
          return(
            alert("Council not valid. Must be in one of the following forms: \nAntrim and Newtownabbey\nArds and North Down\nArmagh City Banbirdge and Craigavon\nBelfast\nCauseway Coast and Glens\nFermanagh and Omagh\nLisburn and Castlereagh\nMid and East Antrim\nNewry Mourne and Down\nMid Ulster")
          )
        }

 //Councillor Email Error Logic
        if(councillorEmail.trim() === ""){
          return(
            alert("Email cannot be empty.")
          )
          }

          if(!isEmail(councillorEmail)){
            return(
              alert("Email not valid.")
            )
          }

 //Councillor Party Error Logic
          if(councillorParty.trim() === ""){
            return(
              alert("Party cannot be empty.")
            )
            }

 //Councillor Number Error Logic
            if(councillorNumber.trim() === ""){
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
              if(councillorWebsite.trim() === ""){
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
      setCouncillors([ ...councillors, ...fetchedCouncillor])
    }
    
   
    ) ;
    
    return(
      alert('Councillor Created'),
      window.location.reload(false)
    )
    }

  const handleUpdate = e =>{
    e.preventDefault()

    
//need logic for if it exists

    API.put('councillorsapi', '/councillors', {
      body: {
        uuid: updateCouncillorUuid,
        Name: updateCouncillorName,
        Council: updateCouncillorCouncil,
        Email: updateCouncillorEmail,
        Party: updateCouncillorParty,
        Telephone: updateCouncillorNumber,
        Website: updateCouncillorWebsite,
      }
    }).then(fetchedCouncillor => {
      setCouncillors([ ...councillors, ...fetchedCouncillor])
    })

    return(
      alert('Councillor Updated'),
      window.location.reload(false)
    )
  }

 
  const handleDelete = e =>{
    e.preventDefault()


    API.del('councillorsapi', `/councillors/${councillorUuid}}`,  {
     Key:{
     uuid: councillorUuid,
     }
    }).then(fetchedCouncillor => {
      setCouncillors([ ...councillors, ...fetchedCouncillor])
    })

    return(
      alert('Councillor Deleted'),
      window.location.reload(false)
    )
  }

useEffect(() =>{
  API.get('councillorsapi', '/councillors/uuid').then((councillorRes) =>{
    setCouncillors([...councillors, ...councillorRes]);
  });
  },);
 
  try{
  if(groups.includes('Admin')){
    return (
    <div className="Faq">
      <div className="Quiz2">
      <NavExample /> 
      <div>
      <h1>Councillors</h1>
      </div>
      <div className="Quiz">

        <h2>Create Councillor</h2>

      <Segment inverted>
 <Form onSubmit={handleSubmit} inverted size='large'>
     <Form.Group>
       <Form.Input font = "Helvetica Neue" name='name' required={true} value={councillorName} label='Name' placeholder='Matthew Brennan' width={10} onChange={(e) => setCouncillorName(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='council'required={true} value={councillorCouncil} label='Council' placeholder='Belfast' width={10} onChange={(e) => setCouncillorCouncil(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='email' required={true} value={councillorEmail} label='Email' placeholder='mattbrennan11@hotmail.co.uk' width={10} onChange={(e) => setCouncillorEmail(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='party' required={true} value={councillorParty} label='Party'  placeholder='Sinn Fein' width={10} onChange={(e) => setCouncillorParty(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='number' required={true} value={councillorNumber} label='Phone Number' placeholder='07549870334' width={10} onChange={(e) => setCouncillorNumber(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='website' required={true} value={councillorWebsite} label='Website' placeholder='mattb.com' width={10} onChange={(e) => setCouncillorWebsite(e.target.value)}/>
      </Form.Group>
     <br></br>
     <Button font = "Helvetica Neue" type='submit'>Create Councillor</Button>     
   </Form>
 </Segment>

 <h2>Delete Councillor</h2>


<Segment inverted>
<Form onSubmit={handleDelete} inverted size='large'>

<Form.Group>
 
<Form.Input font = "Helvetica Neue" name='uuid' required={true} value={councillorUuid} label='ID' placeholder='85285032808' width={2} onChange={(e) => setCouncillorUuid(e.target.value)}/>

</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Delete Councillor</Button>     
</Form>
</Segment>

<h2>Update Councillor</h2>


<Segment inverted>
<Form onSubmit={handleUpdate} inverted size='large'>
<Form.Group>

     
      <Form.Input font = "Helvetica Neue" name='uuid' required={true} value={updateCouncillorUuid} label='ID' placeholder='858025830' width={10} onChange={(e) =>  setUpdateCouncillorUuid(e.target.value)} />
      <Form.Input font = "Helvetica Neue" name='name' required={true} value={updateCouncillorName} label='Name' placeholder='Matthew Brennan' width={10} onChange={(e) =>  setUpdateCouncillorName(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='council' required={true} value={updateCouncillorCouncil} label='Council' placeholder='Belfast' width={10} onChange={(e) => setUpdateCouncillorCouncil(e.target.value)}/>
       <Form.Input font = "Helvetica Neue" name='email' required={true} value={updateCouncillorEmail} label='Email' placeholder='mattbrennan11@hotmail.com' width={10} onChange={(e) => setUpdateCouncillorEmail(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='party' required={true} value={updateCouncillorParty} label='Party'  placeholder='Sinn Fein' width={10} onChange={(e) => setUpdateCouncillorParty(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='number' required={true} value={updateCouncillorNumber} label='Phone Number' placeholder='07549870334' width={10} onChange={(e) => setUpdateCouncillorNumber(e.target.value)} />
       <Form.Input font = "Helvetica Neue" name='website' required={true} value={updateCouncillorWebsite} label='Website' placeholder='mattb.com' width={10} onChange={(e) => setUpdateCouncillorWebsite(e.target.value)} />
     

</Form.Group>
<br></br>
<Button font = "Helvetica Neue" type='submit'>Update Councillor</Button>     
</Form>
</Segment>
 
</div>

       

      <div><div>

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
      <div className="Quiz">
        <Row lg={3}>    { 
    councillors.map((councillor) => {
    
      if((councillor.Party === userInput || councillor.Party.toLowerCase() === userInput || councillor.Party.toUpperCase() === userInput)){
      return (
        <Col className="d-flex">
          
          <Card className="flex-fill mt-3">
            <Card.Header>{councillor.Name}</Card.Header>
            <Card.Body> 
            <Card.Text>ID: {councillor.uuid}</Card.Text>
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
</Row></div>
</div>
</div>
      <FooterExample />
      </div>
      </div>
  );
}  } catch{
  console.error("No access to non admin")
}

return(

  <h2>You have no admin access</h2>
  
)

}

export default withAuthenticator(CouncillorsAdmin);

