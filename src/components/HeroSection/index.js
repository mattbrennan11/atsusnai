import React, {useState} from 'react';
import Video from '../../videos/video.mp4';
import { Button } from '../ButtonElement';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements';

const HeroSection = () => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }


  return (
    <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />

            </HeroBg>
            <HeroContent>
                <HeroH1>Ats Us Nai</HeroH1>
                <HeroP>
                    A one-stop website where you can find your local councillors,
                    compare political parties in Northern Ireland
                    , and take a quiz to find out which Northern Ireland
                    political party best represents your views.
                </HeroP>
                <HeroBtnWrapper>
                    <Button to="quiz" onMouseEnter={onHover} 
                    onMouseLeave ={onHover}
                    primary="true"
                    dark="true"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    >
                        Quiz {hover ? <ArrowForward /> : <ArrowRight/> }
                    </Button>
                    <Button to="councillors" onMouseEnter={onHover} 
                    onMouseLeave ={onHover}
                    primary="true"
                    dark="true"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    >
                        Councillors {hover ? <ArrowForward /> : <ArrowRight/> }
                    </Button>
                    <Button to="parties" onMouseEnter={onHover} 
                    onMouseLeave ={onHover}
                    primary="true"
                    dark="true"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    >
                        Parties {hover ? <ArrowForward /> : <ArrowRight/> }
                    </Button>
                    <Button to="profile" onMouseEnter={onHover} 
                    onMouseLeave ={onHover}
                    primary="true"
                    dark="true"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-80}
                    >
                        Profile {hover ? <ArrowForward /> : <ArrowRight/> }
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection