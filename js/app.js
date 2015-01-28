
$(document).ready(function(){
	var secretNum, //Created in begining of new game
	userNumber, //Guessed in begining of new game 
	guessCount, //Needs to go +1 each click
	prevGuess, //previous guess to tell you whether or not you are hot or cold
	guessDif, //guess distance to guess
	diff; //difference between secret number and user input

	function generateNum() {
		return	Math.floor(Math.random() * 100 + 1);
	}
	// Starting a new game 
	function newGame(){
		secretNum = generateNum();
		//New Game defaults
		$('#count').text(0);
		$('#guessList').empty();
		$('#feedback').text("Make your guess!");
		console.log("The secret number is " + secretNum);
	}
	// Users previous guess was wrong
	function nextGuess(userguess){
		$('#count').text(guessCount + 1);
		$('#userGuess').val('');
		$('#guessList').append('<li>' + userguess + '</li');
	}
	// Let user know how far off he or she is
	function feedback(ui) {
		//convert the appended li from the nextGuess function to a integer value
		prevGuess = parseInt($('#guessList li').last().html());
		guessCount = parseInt($('#count').text());
		//if user input in not a numer or is not between 1 and 100
		if (isNaN(ui) || parseInt(ui) < 1 || parseInt(ui) > 100 ){
			$('#feedback').text("Please Enter a Number between 1 and 100");
			//make the value of the input field empty
			$('#userGuess').val('');
		}
		//make the user input str a int val 
		else {
			ui = parseInt(ui);
			if (guessCount === 0){
				ui > secretNum ? diff = ui - secretNum : diff = secretNum - ui;
			if (secretNum === ui){
				$('#feedback').text("You guessed the winning number! It is " + secretNum);
			} else if (diff < 10){
				$('#feedback').text("AHH sooo hot!");
			} else if (diff < 20){
				$('#feedback').text("keep on trying you are hot");
			} else	if (diff < 30){
				$('#feedback').text("getting warm");
			} else	if (diff < 50){
				$('#feedback').text("Brrrrr your cold");
			} else {
				$('#feedback').text("You are frozen solid");
			}
			//run nextGuess function with the user input
			nextGuess(ui);
			// find the new difference from the new guess
			} else {
				var newDiff = ui - secretNum;
				var oldDiff = prevGuess - secretNum;
					newDiff = Math.sqrt(newDiff * newDiff);
					oldDiff = Math.sqrt(oldDiff * oldDiff);
				if (secretNum === ui){
					$("#feedback").text("You are good with numbers! You win! The winning number is " + secretNum);
				} else if (newDiff < oldDiff) {
					$("#feedback").text("Your warmer");
				} else if (newDiff > oldDiff){
					$("#feedback").text("Your colder");
				} else {
					$("#feedback").text("Your about the same as you were before");
				}
			nextGuess(ui);
			}
		}
	}

	newGame();

	$('#guessButton').on('click',function(e){
		e.preventDefault();
		//get the user guess from the input box
		userNumber = $("#userGuess").val();
		//run feed back on number 
		feedback(userNumber);
	});
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
  	$(".new").click(function(e){
  		e.preventDefault();
  		newGame();
  	});

});
