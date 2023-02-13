import React, { useEffect, useState } from 'react';
import { questions } from './data/Questions.js';

export default function Quiz() {
	//Questions and house reveal setters
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showQuiz, setShowQuiz] = useState(false);
	const [showParty, setShowParty] = useState(false);

	// Total score per house setters
	const [totalSinnFein, setSinnFein] = useState(0);
	const [totalDup, setDup] = useState(0);
	const [totalSdlp, setSdlp] = useState(0);
	const [totalAlliance, setAlliance] = useState(0);

	//Final result setter
	const [party, setParty] = useState("Muggle");

	//Sorting function
	const answerHandler = (sinnFein, dup, sdlp, alliance) => {
		setSinnFein(totalSinnFein + sinnFein);
		setDup(totalDup + dup);
		setSdlp(totalSdlp + sdlp);
		setAlliance(totalAlliance + alliance);

		switch (Math.max(totalSinnFein, totalDup, totalSdlp, totalAlliance)) {
			case totalSinnFein: setParty("Sinn Fein")
				break;
			case totalDup: setParty("DUP")
				break;
			case totalSdlp: setParty("SDLP")
				break;
			case totalAlliance: setParty("Alliance")
				break;
			default:
				break;
		};

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowParty(true);
		}
	};

	const [banner, setBanner] = useState('')
	const changeBanner = () => {
		if (party === 'Sinn Fein' && showParty===true) {
			setBanner(require("./assets/banners/Gryffindor.jpg"));}
		if (party === 'DUP' && showParty===true) {
			setBanner(require("./assets/banners/Slytherin.jpg"));}
		if (party === 'SDLP' && showParty===true) {
			setBanner(require("./assets/banners/Ravenclaw.jpg"));}
		if (party === 'Alliance' && showParty===true) {
			setBanner(require("./assets/banners/Hufflepuff.jpg"));}
	};
	// Always check which house has most points in order to reveal the respective banner
	useEffect(() => {
		changeBanner()
	});

	return (
		<div>
		<div className='main-title'>The NI Political Quiz</div>
		<div className='app' style={{borderRadius:'7px', backgroundPosition: '50%', backgroundBlendMode:'normal', backgroundImage: `url(${banner})`}}>
			{showQuiz ? (
			<div>
			{showParty ? (
				<div className='score-section'>
					You are aligned with 
					<br/>
					<p className='party'>{party}</p>
				</div>

			) : (
				<>
				<div className='part-two'>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].options.map((option) => (
							<button onClick={() => {answerHandler(option.sinnFein, option.dup, option.sdlp, option.alliance);}}>{option.optionText}</button>
						))}
					</div>
				</div>

				</>
			)} </div>
		) : (
		<>
				<div className='intro-part'>
					<div className='intro-text'>
						Welcome to the Ats Us Nai Northern Ireland Political Party Quiz!
                        To find out which political party best reflects your views, you will be asked a series of questions about various topics, 
                        and you must answer as truthfully as you can.
						By the end, the quiz will decide and tell you where you belong. <br/>Good luck!
					</div>
					<div className='intro-exp'>
						This is more of a dev project than an actual quiz, it's made for fun, but feel free to drop by and say hi via the links below :) Enjoy!
					</div>
					<button className='start-button button-loader' onClick={() => setShowQuiz(true)}>Start</button>
				</div>
		</>
		)}
		</div>
		</div>
	);
}
