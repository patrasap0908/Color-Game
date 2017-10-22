var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var squares = document.querySelectorAll(".square");
var colorPicked = document.querySelector("#colorPicked");
var modes = document.querySelectorAll(".mode");

var numSquares = 6;
var colors = generateColors(numSquares);
var colorAnswer = randomColor();

resetNow();

for(var i = 0; i < modes.length; i++) {
	modes[i].addEventListener("click", function() {
		modes[0].classList.remove("selected");
		modes[1].classList.remove("selected");
		this.classList.add("selected");

		if(this.textContent === "Easy") 
			numSquares = 3;
		else
			numSquares = 6;

		resetNow();
	})
}

function resetNow() {
	reset.textContent = "New colors";
	colors = generateColors(numSquares);
	h1.style.backgroundColor = "steelblue";
	colorAnswer = randomColor();
	colorPicked.textContent = colorAnswer;

	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else
			squares[i].style.display = "none";
	}
	message.textContent = "";
}

reset.addEventListener("click", function() {
	resetNow();
});

for (var i = 0; i < colors.length; i++) {
	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click", function() {

		var clickedColor = this.style.backgroundColor;
		if(clickedColor === colorAnswer) {
			message.textContent = "Correct!";
			h1.style.backgroundColor = clickedColor;
			correctColor(clickedColor);
			reset.textContent = "Play again?";
		}

		else {
			this.style.backgroundColor = "black";
			message.textContent = "Try again!";
		}
	});
}

function generateColors(num) {
	var generatedColors = [];
	for (var i = 0; i < num; i++) {
		generatedColors[i] = "rgb(" + Math.round(Math.random()*255) + ", " 
							+ Math.round(Math.random()*255) + ", " 
							+ Math.round(Math.random()*255) + ")";
	}

	return generatedColors;
}

function correctColor(color) {
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function randomColor() {
	var index = (Math.round(Math.random() * colors.length));
	return colors[index];
}