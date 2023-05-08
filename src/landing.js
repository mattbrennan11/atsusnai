import React, {useState, useEffect} from 'react';
import './App.css';
import {Amplify, API} from 'aws-amplify'
import config from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import NavExample from './components/Navbar'
import FooterExample from './components/Footer';
import { withAuthenticator} from "@aws-amplify/ui-react";



Amplify.configure(config);

function Landing({user}) {


  
  const [counts, setPartyCount] = React.useState([])

  //Function to calculate time remaining in days, hours, minutes, seconds
  const calculateTimeLeft = () => {

    let timeLeft = {};
    const difference = +new Date("2023-05-18") - +new Date();

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60)/24),
        hours: Math.floor(difference / (1000 * 60 * 60)%24-1),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });
 
  return ( 

    <div className="Parties">
<div>
          <h1>Welcome {user.attributes.nickname} </h1>
</div>
    <div className="Img">
      <img src={require('./map.jpeg')} width="100%" height="500" padding-bottom="10px" />
    </div>
    
    <div className="Landing3">
      <h6>Ats Us Nai</h6>
      <h6>A one-stop website where you can find your local councillors, compare political parties in Northern Ireland, and take a quiz to find out which Northern Ireland political party best represents your views.</h6>
      </div>
  
 
      <h2>Polling Day</h2>
    <div className="Landing">

         <h6>18th May 2023</h6>
         <br></br>
    {timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
      <h6>{timeLeft.days} Days | {timeLeft.hours} Hours | {timeLeft.minutes} Minutes | {timeLeft.seconds} Seconds</h6>
       ) : (
        <h6>Election Day 🔥</h6>
      )
       }

</div>
<div>
       </div>

   
 


<h2>Quick Links</h2>
<div className="Landing">
<h6>Education Links</h6>
<Button href={'/quiz'}>NI Political Quiz</Button>
<br></br>
<Button href={'/parties'}>Political Parties</Button>
<br></br>
<h6>Engagement Links</h6>
<Button href={'/discuss'}>Discussion</Button>
<br></br>
<h6>Registration Links</h6>
<Button href={'/faq'}>FAQ</Button>
<br></br>
 </div>
 <br></br>
 </div>

);
}

export default withAuthenticator(Landing)

/**      <div className="Video">
  <h2>Helpful NI Politics Videos</h2>
<Carousel fade>
  <Carousel.Item>
  <iframe className= "d-block w-100" width="800" height="500" src="https://www.youtube.com/embed/lwh0mdtBSZU" 
  title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
  </Carousel.Item>
  <Carousel.Item>
  <iframe className= "d-block w-100" width="800" height="500" src="https://www.youtube.com/embed/zNCdyEGSTdM" title="Welcome to Your Vote - How to Vote - Northern Ireland - Full Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
  </Carousel.Item>
  <Carousel.Item>
  <iframe className= "d-block w-100" width="800" height="500" src="https://www.youtube.com/embed/rgnNBpzFV1o" title="Welcome to Your Vote - Local Councils - Northern Ireland" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
  </Carousel.Item>
</Carousel>
</div> */