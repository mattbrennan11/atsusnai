import React, {useState, useEffect} from 'react';
import {FaBars} from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements';
import {
    withAuthenticator,

  } from "@aws-amplify/ui-react";

const Navbar = ({ toggle, signOut }) => {

    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = ()=> {
        if(window.scrollY >= 80){
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, []);

    const toggleHome = () =>{
        scroll.scrollToTop();
    };

  return (
   <>
    <Nav scrollNav={scrollNav}>
    <NavLogo to='/' onClick={toggleHome}>ats us nai</NavLogo>
        <NavbarContainer>
            <MobileIcon onClick={toggle}>
                <FaBars />
            </MobileIcon>
            <NavMenu>
                <NavItem>
                    <NavLinks 
                    to="quiz"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    >Quiz</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks 
                    to="councillors"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    >Councillors</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks 
                    to="parties"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    >Party</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks 
                    to="profile"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    >Profile</NavLinks>
                </NavItem>
                
                <NavBtn>
                    
                   <NavBtnLink onClick={signOut}Sign Out>Sign Out</NavBtnLink>  
                     
                     </NavBtn>
            </NavMenu>
            
        </NavbarContainer>
    </Nav>
   </>
  );
};

export default withAuthenticator(Navbar);

//<Button onClick={signOut}>Sign Out</Button>

//<NavBtn>
    //            <NavBtnLink to="/src/index.html">Sign In</NavBtnLink>
       //     </NavBtn>