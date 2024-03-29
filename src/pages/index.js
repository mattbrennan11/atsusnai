import React, {useState} from 'react'
import NavExample from '../components/Navbar';
import Landing from '../landing';
import FooterExample from '../components/Footer';

const Home = () => {
    const[isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    };

  return (
    <>
     <NavExample toggle={toggle} />
     <Landing toggle={toggle}/>
     <FooterExample toggle={toggle} />
    </>
  );

};

export default Home;