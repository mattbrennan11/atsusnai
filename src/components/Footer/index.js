import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {useState, useEffect} from 'react';

const FooterExample = () => {
    
    return (
      <Navbar position="absolute" fixed="bottom" bg="dark" variant="dark" expand="lg" >
        <Container>
          <Navbar.Brand href="/">Ats Us Nai</Navbar.Brand>
            <Nav className="me-auto">
            </Nav>
        </Container>
      </Navbar>
    );
  }

export default (FooterExample);