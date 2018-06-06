//Variables 
const slider = document.querySelector(".onOff__slider");
let on = false;

const startBtn = document.querySelector('.start');
let startClicked = false;
const strictBtn = document.querySelector('.strict');
const strictLight = document.querySelector('.light');

const countText = document.querySelector('.count__box p');
let round = 0;

const buttons = document.querySelectorAll('.button');
let myInterval;

let compInputs = [];
let userInputs =[];

let strict = false;
let compFinished = false;

//function when slider is clicked 
function onOff() {
	slider.classList.toggle('slide');
	on = !on;
	strictLight.classList.remove('lightOn');
	strict = false;
	compFinished = false;
	clearInterval(myInterval);
	on ? countText.textContent = '--' : countText.textContent = '';
}

slider.addEventListener('click', onOff);

function startFunc() {
	if(!on) return;
	compInputs = [];
	round = 0;
	nextRound();
}

startBtn.addEventListener('click', startFunc);

//Enable strict mode
function strictFunc() {
	if (!on) return;
	strict = !strict;
	strictLight.classList.toggle('lightOn');
}

strictBtn.addEventListener('click', strictFunc);

function nextRound() {
	userInputs = [];
	
	round++;
	round < 10 ? countText.textContent = "0" + round : countText.textContent = round;
	
	let randomNum = Math.floor(Math.random() * 4);
	compInputs.push(randomNum);
	console.log(compInputs);
	displayCompInputs();
}

//Highlight each element in compInputs array
function displayCompInputs() {
	let index = 0;
	myInterval = setInterval(() =>{
		let roundVal = compInputs[index];
		let button = buttons[roundVal];
		lightUpBtn(button);
		index++;
		index === compInputs.length ? clearInterval(myInterval) : null;
	}, 1200);
	compFinished = true;
}

//Change opacity of currently active button
function lightUpBtn(element) {
	element.classList.add('lightUp');
	setTimeout(() => {
		element.classList.remove('lightUp')
	}, 700);
}

//Change opacity of all buttons to signal to user that incorrect answer was input
function wrongAnswer() {
	buttons.forEach(button => {
		lightUpBtn(button);
	});
}

function mouseUpHandler(e) {
	e.preventDefault();
	if(!on || !compFinished) return;
	this.classList.remove('lightUp');
	let index = Number(this.dataset.index);
	userInputs.push(index);
	if (userInputs[userInputs.length - 1] !== compInputs[userInputs.length - 1]) {
		compFinished = false;
		userInputs = [];
		setTimeout(wrongAnswer, 700);	
		if (strict) {
			round = 0;
			compInputs = [];	
			setTimeout(startFunc, 1700);
		} else {
			setTimeout(displayCompInputs, 1700);
		}
	}
	if (userInputs.length === compInputs.length) {
		nextRound();
	}
}

//if (window.innerWidth > 550) {
//	buttons.forEach(button => button.addEventListener('mousedown', function() {
//		if(!on || !compFinished) return;
//		button.classList.add('lightUp');
//	}));
//	
//	buttons.forEach(button => button.addEventListener('mouseup', mouseUpHandler));
//}

buttons.forEach(button => button.addEventListener('touchstart', function(e) {
	e.preventDefault();
	if(!on || !compFinished) return;
	button.classList.add('lightUp');
}));

buttons.forEach(button => button.addEventListener('touchend', mouseUpHandler));

buttons.forEach(button => button.addEventListener('mousedown', function() {
	if(!on || !compFinished) return;
	button.classList.add('lightUp');
}));

buttons.forEach(button => button.addEventListener('mouseup', mouseUpHandler));