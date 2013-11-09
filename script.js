$(document).ready(function() {

// -------------- Functions and Variables
var complete = false; // will turn to true after the test is done
var score = 0;
var questionsAnswered = 0; // counter for number of questions answered
var status; // will convert a boolean to 'correct' or 'incorrect'
var response; //user response
var numChoices = 4; // stores how many choices each question will have so that if it changes, loops in program will automatically change
var questions = [
				{question: "The Star-nosed Mole (Condylura cristata) is able to decide in the ultra short time of ____ ms if a prey is edible or not.", choices: ["8", "17", "20", "118"], correct:0, answered:false, result:null, pic:"mole", userChoice:null, feedback:"This mole's brain decides in the ultra short time of 8 ms if a prey is edible or not. This speed is at the limit of the speed of neurons. A report in the journal Nature gives this animal the title of fastest-eating mammal, taking as short as 120 milliseconds (average: 227 ms) to identify and consume individual food items."},
				{question: "What is the name of this animal?", choices: ["Mara", "Devil Rat", "Aye-aye", "Gerenuk"], correct:2, answered:false, result:null, pic:"aye-aye", userChoice:null, feedback: "This beautiful, cute and cuddly creature is called an Aye-Aye. They tap on trees to find their food (grubs), gnaw a hole in the wood, and then use their abnormally long middle finger to pull out the grubs.  This is called percussive foraging."},
				{question: "What is the natural habitat of the Scotoplanes?", choices: ["Marshes and swamps", "Deep sea", "Lake bottoms", "Tropical forests"], correct:1, answered:false, result:null, pic:"sea-pig", userChoice:null, feedback:"Commonly called 'Sea Pigs', they live in ocean at depths of over 1000 meters.  They feed on organic deposits found in deep sea mud."},
				{question: "In addition to a defence against predators, the quills on the back of the Lowland Streaked Tenrec are used to:", choices: ["Make sound to communicate", "Attract a mate", "Camouflage", "Release body heat"], correct:0, answered:false, result:null, pic:"tenrec", userChoice:null, feedback:"The streaked tenrec is the only mammal known to use stridulation for generating sound, a method more commonly associated with insects and snakes."},
				{question: "The mantis shrimp attacks by striking with its claws at an acceleration comparable to:", choices: ["an olympic boxer", "A professional baseball player", "An arrow from a crossbow", "A .22 calibre bullet"], correct:3, answered:false, result:null, pic:"mantis", userChoice:null, feedback:"Certain species of the mantis shrimp ('smashers') punch at an acceleration of 10,400 g (102,000 m/s2 or 335,000 ft/s2) and speeds of 23 m/s from a standing start, about the acceleration of a .22 calibre bullet. Even more, because they strike so rapidly, they generate cavitation bubbles between the appendage and the striking surface."}
				];

var qNum = 0; //marks the question that the user is on
var correct; //correct answer
var answered; //stores the value of whether the user has already answered the question
var result; //stores the value of whether the answer was answered correctly or incorrectly (true = correct, false = incorrect)

var loadQuestionsChoices = function() {
clearRadios();
$('#score').text(score + "/" + questions.length);
if (questions[qNum].answered == false) { 
$('#question').text(questions[qNum].question); // load the correct question
// load the correct picture
$('.picture').attr("id", questions[qNum].pic).hide().fadeIn();
}
else {
$('.picture').attr("id", questions[qNum].pic) //don't animate again	if question was already answered
	if (questions[qNum].result)
		status = "Correct! ";
	else if (questions[qNum].result == false) 
		status = "Incorrect. ";
$('#feedback').hide().fadeIn().text(status + questions[qNum].feedback); // load feedback
}

for (var i=0; i<numChoices; i++) {	
	$("#choice" + i).text(questions[qNum].choices[i]); //load each correct choice option
	// next, if the user has already answered the question, show the correct and incorrect choices
	if (questions[qNum].answered) {
		if (i == questions[qNum].correct) 
			$("#choice" + i).toggleClass("correct", 1000);
		else 
			$("#choice" + i).toggleClass("incorrect", 1000);
		}
		else {
			$("#choice" + i).toggleClass("unanswered", 1000);
			$('#feedback').hide().fadeIn().text("Test your knowledge of this strange animal.  Select an answer and hit the submit button. " + "Question " + (qNum + 1) + " of " + questions.length);
		}
		// next, show the answer that the user has chosen
		if (i == questions[qNum].userChoice) 
			$("#chosen" + i).hide().fadeIn().text("You chose #" + (i + 1));
	}
	//update nav buttons to show which questions were answered correctly/incorrectly or unanswered	
for (var i=0; i<questions.length; i++) {
	// console.log(questions[i].result);
	if(questions[i].result) 
		$('#nav' + i).toggleClass("correct", 1000);
	else if (questions[i].result == false)
		$('#nav' + i).toggleClass("incorrect", 1000);
	else
		$('#nav' + i).toggleClass("unanswered", 1000);	
	}
if(questionsAnswered == questions.length && complete == false) {
	alert("Your final score is " + score + "/" + questions.length);
	complete = true; // marks the test as done so the user does not have a pop-up come up every time they navigate to a different question after they finish the quiz
	}
}


var loadNavButtons = function() {
	for (var i=0; i<questions.length; i++) 
		$('#nav-buttons').append('<div class="nav-button num" id="nav' + i + '">' + (i+1) + '</div>'); //load correct number of nav buttons
}

var loadRadioButtons = function() {
	for (var i=0; i<numChoices; i++) 	
		$('#choices').append('<br><input type="radio" id="radio' + i + '" name="radios"><div class="choice" id="choice' + i + '"></div>' + '<div class="chosen" id="chosen' + i + '"' + '></div>'); // load correct number of radio buttons
}	

var checkAnswer = function() {
	correct = questions[qNum].correct; 
	answered = questions[qNum].answered; 
	result = questions[qNum].result;
	// console.log(qNum + " " + answered);

	if (answered) {alert("You have already answered the question")}
	else {
		for (var i=0; i<numChoices; i++) {
		//determine which radio button is pressed
		if (document.getElementById('radio' + i).checked) {
		response = i;
		questions[qNum].userChoice = i; // mark which question the user chose
			} 
		}
		if (response == null) 
			alert("Please make a selection before hitting submit")
		else {	
			// console.log(response + " " + questions[qNum].correct); 
			if (response == correct) {
				questions[qNum].result = true;
				score++; //add one to the score
			}
			else {
				questions[qNum].result = false;
			}
	questions[qNum].answered = true; //mark this question as answered  QUESTION: when I used 'answered' instead of questions[qNum].answered, it did not update - why?
	questionsAnswered++; // add one to the counter variable 'questionsAnswered'
		}
	response = null; //reset 'response' so it does not carry over to the next question
	// console.log(questions[0].answered);
	loadQuestionsChoices();
	}
}	

// function to reset/clear radio selecetion and nav and radio classes after each response or navigation
var clearRadios = function() {
	for (var i=0; i<numChoices; i++) {
		document.getElementById('radio' + i).checked = false;
		$("#choice" + i).attr('class', 'choice');
		$('.chosen').text("");
		}
	for (var i=0; i<questions.length; i++) 
		$('#nav' + i).attr('class', 'nav-button num');
}

// shorthand method for clearing/refreshing the radio buttons, questions, choices and pictures
var refresh = function() {
	$('#feedback').text('');
	clearRadios();
	loadQuestionsChoices();
}

// -------------- Start of program
$('h1').hide().toggle("blind", {direction: "right"}, 1000);
loadRadioButtons();
loadNavButtons();
refresh();



$('#submit').click(checkAnswer);

$('#previous').click(function() {
	if (qNum != 0) {
		$('#box').animate({left:"-=122px"}, 500);
		qNum--;
		refresh();
	}
});

$('#next').click(function() {
	if (qNum != questions.length - 1) {
		$('#box').animate({left:"+=122px"}, 500);
		qNum++;
		refresh();
	}
});

$('.num').click(function() {
		var id = $(this).attr("id");
		var idNum = parseInt(id.substr(3,3));
		var position = 0;;
		console.log(position + " " + idNum);	
		switch (idNum) {
			case 0: 
				position = "270px";
				break;
			case 1:	
				position = "392px";
				break;
			case 2:
				position = "514px";
				break;
			case 3:
				position = "636px";
				break;		
			case 4:
				position = "758px";
				break;
		}
		console.log(position + " " + idNum);
		$('#box').animate({left:position}, 500);
		qNum = idNum;
		refresh();
		// animateBox();
});

$('.nav-button').hover(
	function() {$(this).animate({boxShadow:"0px 0px 30px rgba(255, 136, 0, 1.0) inset, 1px 1px 3px rgba(0, 0, 0, 1.0) outset"}, 200)}, 
	function() {$(this).animate({boxShadow:"0px 0px 30px rgba(255, 136, 0, 0.0) inset, 1px 1px 3px rgba(0, 0, 0, 1.0) outset"}, 200)}
);

});