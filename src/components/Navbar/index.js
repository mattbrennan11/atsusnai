import Container from 'react-bootstrap/Container';


import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React from 'react';

import {withAuthenticator} from "@aws-amplify/ui-react";

const NavExample = ({signOut, user}) => {

  const groups = user.signInUserSession.accessToken.payload["cognito:groups"]

  try{
    if(groups.includes('Admin')){
    return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Ats Us Nai</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
          
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/quiz">Quiz</Nav.Link>
              <Nav.Link href="/discuss">Discuss</Nav.Link>
              <Nav.Link href="/councillorsadmin">Councillors</Nav.Link>
              <Nav.Link href="/partiesadmin">Political Parties</Nav.Link>
              <Nav.Link href="/faqadmin">FAQ</Nav.Link>

            </Nav> 
            <Button variant="primary" size="sm" onClick={signOut}>Sign Out</Button>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    );}} catch {
      console.error()
    }

    return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Ats Us Nai</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/quiz">Quiz</Nav.Link>
              <Nav.Link href="/discuss">Discuss</Nav.Link>
              <NavDropdown title="Councillors" id="basic-nav-dropdown">
              <NavDropdown.Item href="/antrim">Antrim & Newtonabbey</NavDropdown.Item>
              <NavDropdown.Item href="/ards">Ards & North Down</NavDropdown.Item>
              <NavDropdown.Item href="/armagh">Armagh City, Banbridge, & Craigavon</NavDropdown.Item>
              <NavDropdown.Item href="/belfast">Belfast</NavDropdown.Item>
              <NavDropdown.Item href="/causeway">Causeway Coast & Glens</NavDropdown.Item>
              <NavDropdown.Item href="/fermanagh">Fermanagh & Omagh</NavDropdown.Item>
              <NavDropdown.Item href="/lisburn">Lisburn & Castlereagh</NavDropdown.Item>
              <NavDropdown.Item href="/ulster">Mid Ulster</NavDropdown.Item>
              <NavDropdown.Item href="/midantrim">Mid & East Antrim</NavDropdown.Item>
              <NavDropdown.Item href="/newry">Newry Mourne & Down</NavDropdown.Item>
            </NavDropdown>
              <Nav.Link href="/parties">Political Parties</Nav.Link>
              <Nav.Link href="/faq">FAQ</Nav.Link>
              <Nav.Link href="/councillorsadmin">Admin</Nav.Link>
            </Nav>
            <Button variant="primary" size="sm" onClick={signOut}>Sign Out</Button>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    );

    
}

export default withAuthenticator(NavExample); 
