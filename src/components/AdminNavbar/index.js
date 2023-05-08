import Container from 'react-bootstrap/Container';


import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React from 'react';

import {withAuthenticator} from "@aws-amplify/ui-react";

const AdminNav = ({signOut}) => {

  
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
    );
    
}

export default withAuthenticator(AdminNav); 
