$(document).ready(function() {

// -------------- Functions and Variables
var score;
var response; //user response
var numChoices = 4; // stores how many choices each question will have so that if it changes, loops in program will automatically change
var questions = [
				{question: "The Star-nosed Mole (Condylura cristata) is able to decide in the ultra short time of ____ ms if a prey is edible or not.", choices: ["8", "17", "20", "118"], correct:0, answered:false, result:null},
				{question: "What is the name of this animal?", choices: ["Mara", "Devil Rat", "Aye-aye", "Gerenuk"], correct:2, answered:false, result:null},
				{question: "What is the natural habitat of this animal?", choices: ["Marshes and swamps", "Deep sea", "Lake bottoms", "Tropical forests"], correct:1, answered:false, result:null},
				{question: "In addition to a defence against predators, the quills on the back of the Lowland Streaked Tenrec are used to:", choices: ["Make sound to communicate", "Mating signal", "Camouflage", "Release body heat"], correct:0, answered:false, result:null},
				{question: "The mantis shrimp attacks by striking with its claws at an acceleration comparable to:", choices: ["an olympic boxer", "A professional baseball player", "An arrow from a crossbow", "A .22 calibre bullet"], correct:3, answered:false, result:null}
				];

var qNum = 0; //marks the question that the user is on
var correct; //correct answer
var answered; //stores the value of whether the user has already answered the question
var result; //stores the value of whether the answer was answered correctly or incorrectly (true = correct, false = incorrect)

var loadQuestionsChoices = function() {
clearRadios();
$('#question').text(questions[qNum].question); // load the correct question
for (var i=0; i<numChoices; i++) {	
	$("#choice" + i).text(questions[qNum].choices[i]); //load each correct choice option
	// next, if the user has already answered the question, show the correct and incorrect choices
	if (questions[qNum].answered) {
		if (i == questions[qNum].correct) 
			$("#choice" + i).toggleClass("correct");
		else 
			$("#choice" + i).toggleClass("incorrect");
		}
	else 
		$("#choice" + i).toggleClass("unanswered");
	}

	
	//update nav buttons to show which questions were answered correctly/incorrectly or unanswered
	;
for (var i=0; i<questions.length; i++) {
	// console.log(questions[i].result);
	if(questions[i].result)
		$('#nav' + i).toggleClass("correct");
	else if (questions[i].result == false)
		$('#nav' + i).toggleClass("incorrect");
	else if (questions[i].result == null)
		$('#nav' + i).toggleClass("unanswered");	
	}
}

var loadNavButtons = function() {
	for (var i=0; i<questions.length; i++) 
		$('#nav-buttons').append('<div class="nav-button" id="nav' + i + '">' + (i+1) + '</div>'); //load correct number of nav buttons
}

var loadRadioButtons = function() {
	for (var i=0; i<numChoices; i++) 	
		$('#choices').append('<br><input type="radio" id="radio' + i + '" name="radios"><div class="choice" id="choice' + i + '"></div>'); // load correct number of radio buttons
}	

var checkAnswer = function() {
	correct = questions[qNum].correct; 
	answered = questions[qNum].answered; 
	result = questions[qNum].result;
	// console.log(qNum + " " + answered);

	if (answered) {alert("You have already answered the question")}
	else {
		for (var i=0; i<numChoices; i++) {
		if (document.getElementById('radio' + i).checked) {response = i}; //determine which radio button is pressed
			}
		if (response == null) 
			alert("Please make a selection before hitting submit")
		else {	
			// console.log(response + " " + questions[qNum].correct); 
			if (response == correct) {
				questions[qNum].result = true;
				score++; //add one to the score
				alert("correct");
			}
			else {
				questions[qNum].result = false;
				alert("incorrect");
			}
	questions[qNum].answered = true; //mark this question as answered  QUESTION: when I used 'answered' instead of questions[qNum].answered, it did not update - why?
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
		$("#choice" + i).removeClass("correct").removeClass("incorrect").removeClass("unanswered");
		}
	for (var i=0; i<questions.length; i++) 
		$('#nav' + i).removeClass("correct").removeClass("incorrect").removeClass("unanswered");
}

// shorthand method for clearing/refreshing the radio buttons, questions, choices and pictures
var refresh = function() {
	clearRadios();
	loadQuestionsChoices();
}

// -------------- Start of program
loadRadioButtons();
loadNavButtons();
refresh();


$('#submit').click(checkAnswer);

$('#previous').click(function() {
	if (qNum != 0) {
		qNum--;
		refresh();	
	}
});

$('#next').click(function() {
	if (qNum != questions.length - 1) {
		qNum++;
		refresh();
	}
});



// console.log(questions[1].question);
// console.log(questions[1].choices[1]);
});
