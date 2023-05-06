import React, { useEffect, useState } from 'react';
import { questions } from './data/Questions.js';
import {Amplify, API} from 'aws-amplify'
import NavExample from './components/Navbar'
import FooterExample from './components/Footer';
import Card from 'react-bootstrap/Card';
import uuid from "uuid"
import Button from 'react-bootstrap/Button';
import { withAuthenticator} from "@aws-amplify/ui-react";

const Quiz = () => {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showQuiz, setShowQuiz] = useState(false);
	const [showParty, setShowParty] = useState(false);

	//Setting the total score of each political party - based on user answers
	const [totalSinnFein, setSinnFein] = useState(0);
	const [totalDup, setDup] = useState(0);
	const [totalSdlp, setSdlp] = useState(0);
	const [totalAlliance, setAlliance] = useState(0);
	const [totalUup, setUup] = useState(0);

	//Setting the total percent of each political party
	const [totalPercentSinnFein, setPercentSinnFein] = useState(0);
	const [totalPercentDup, setPercentDup] = useState(0);
	const [totalPercentSdlp, setPercentSdlp] = useState(0);
	const [totalPercentAlliance, setPercentAlliance] = useState(0);
	const [totalPercentUup, setPercentUup] = useState(0);

	//Final result setter
	const [party, setParty] = useState("");
	const [partyTotal, setPartyTotal] = useState(0);
	const [partyLink, setPartyLink] = useState("");

	//Function to set each political parties totals, percentages, links, and overall winner
	const answerHandler = (sinnFein, dup, sdlp, alliance, uup) => {
		setSinnFein(totalSinnFein + sinnFein);
		setDup(totalDup + dup);
		setSdlp(totalSdlp + sdlp);
		setAlliance(totalAlliance + alliance);
		setUup(totalUup + uup);
		setPercentSinnFein((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance + totalUup + uup)/100*(totalSinnFein + sinnFein)  )
		setPercentSdlp((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance+ totalUup + uup)/100*(totalSdlp + sdlp)  )
		setPercentDup((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance+ totalUup + uup)/100*(totalDup + dup)  )
		setPercentAlliance((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance+ totalUup + uup)/100*(totalAlliance + alliance)  )
		setPercentUup((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance+ totalUup + uup)/100*(totalUup + uup)  )

		switch (Math.max(totalSinnFein, totalDup, totalSdlp, totalAlliance, totalUup)) {
			case totalSinnFein: 
			setParty("Sinn Fein")
			setPartyTotal((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance + totalUup + uup)/100*(totalSinnFein + sinnFein) )
			setPartyLink("https://www.sinnfein.ie/")
				break;
			case totalDup: 
			setParty("DUP")
			setPartyTotal((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance+ totalUup + uup)/100*(totalDup + dup))
			setPartyLink("https://mydup.com/")
				break;
			case totalSdlp: 
			setParty("SDLP")
			setPartyTotal((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance+ totalUup + uup)/100*(totalSdlp + sdlp))
			setPartyLink("https://www.sdlp.ie/")
				break;
			case totalAlliance: 
			setParty("Alliance")
			setPartyTotal((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance+ totalUup + uup)/100*(totalAlliance + alliance))
			setPartyLink("https://www.allianceparty.org/")
				break;
				case totalUup: 
				setParty("UUP")
				setPartyTotal((totalSinnFein + sinnFein + totalDup + dup + totalSdlp + sdlp + totalAlliance + alliance + totalUup + uup)/100*(totalUup + uup))
				setPartyLink("https://www.uup.org/")
					break;
			default:
				break;
		};

		//Setting the next question from the questions file
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowParty(true);
		}
	};

	//Setting the political party banner based on which party has most points
	const [banner, setBanner] = useState('')
	const changeBanner = () => {
		if (party === 'Sinn Fein' && showParty===true) {
			setBanner(require("./assets/banners/sinnfein.jpeg"));}
		if (party === 'DUP' && showParty===true) {
			setBanner(require("./assets/banners/dup.png"));}
		if (party === 'SDLP' && showParty===true) {
			setBanner(require("./assets/banners/SDLP.png"));}
		if (party === 'Alliance' && showParty===true) {
			setBanner(require("./assets/banners/alliance.png"));}
			if (party === 'UUP' && showParty===true) {
				setBanner(require("./assets/banners/uup.jpeg"));}
	};

	//Checking which party has most points to show banner
	useEffect(() => {
		changeBanner()
	});

	return (
		
		<div className="Faq">
		<div className="Quiz2">
			<NavExample/>
		
		<div>
			<h1>Political Quiz</h1>
		</div>
	
			<div className="Img">
			<img src={require('./quiz.jpeg')} width="100%" height="500" padding-bottom="10px"/>
			</div> 
			
		<div className='app2' style={{backgroundImage: `url(${banner})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
			{showQuiz ? (
			<div>
			{showParty ? (
				 
				<div className='score-section'>
					
					<h1>You are most aligned with:</h1>
					<h2 className='party'>{party}: {partyTotal.toFixed(1)}% </h2>
					<Button href={partyLink} variant="primary"><h2>Visit Website</h2></Button>

					<h1>Overall results:</h1>
					<div>
					<h2 className='party'>Alliance: {totalPercentAlliance.toFixed(1)}%</h2>
					<h2 className='party'>DUP: {totalPercentDup.toFixed(1)}%</h2>
					<h2 className='party'>SDLP: {totalPercentSdlp.toFixed(1)}%</h2>
					<h2 className='party'>Sinn Fein: {totalPercentSinnFein.toFixed(1)}%</h2>
					<h2 className='party'>UUP: {totalPercentUup.toFixed(1)}%</h2>
				</div>
				</div> 

			) : (
				<>
				<div className='part-two'>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}/{questions.length}</span>
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].options.map((option, i) => (
							<button key={i} className='start-button2 button-loader' onClick={() => {answerHandler(option.sinnFein, option.dup, option.sdlp, option.alliance, option.uup);}}>{option.optionText}</button>
						))}
					</div>
				</div> 

				</>
			)} </div>
		) : (
		<>
				<div className='intro-part'>
				<div className='main-title'>Take the Quiz</div>
					<div className='intro-text'> 
						Welcome to the Ats Us Nai Northern Ireland Political Party Quiz!
                        To find out which political party best reflects your views, you will be asked a series of questions about various issues, 
                        and you must answer as honestly as you can.
						By the end, the quiz will tally up your scores and tell you which party you are most aligned with.
					</div>
					<button className='start-button button-loader'  onClick={() => setShowQuiz(true)}>Start</button>
				</div>
		</>
		)}
		</div>
		<footer className="footer--pin">
			
		<FooterExample/>
		</footer>
	</div>
		</div>
	);
};

export default withAuthenticator(Quiz);
