// global variables
// ===============================================

// arrays and variables for holding data-toggle
var wordOptions = ["cleveland", "orlando", "toronto", "vancouver", "atlanta", "portland", "miami", "memphis", "phoenix", "houston", "dallas", "sacramento", "oakland", "minnesota", "jacksonville", "boston", "seattle", "chicago", "detriot", "philadelphia", "washington", "denver", "phoenix", "pittsburgh", "baltimore", "cincinnati", "milwaukee", "charlotte"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 8;

// functions
// ===============================================

function startGame() {
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersinWord = selectedWord.split("");
  numBlanks = lettersinWord.length;

  // reset
  guessesLeft = 8;
  wrongLetters = [];
  blanksAndSuccesses = [];

  // populate blanksAndSuccesses with right number of blanks
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // change html
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("winCounter").innerHTML = winCount;
  document.getElementById("winCounter").innerHTML = winCount;
  document.getElementById("lossCounter").innerHTML = lossCount;

  // debug
  console.log(selectedWord);
  console.log(lettersinWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
  //Check if letter exists in code at all

  var isLetterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if(selectedWord[i] == letter) {
      isLetterInWord = true;
    }
  }

  // Check where in word letter exists, then populate out blanksAndSuccesses array.
  if(isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if(selectedWord[i] == letter) {
        blanksAndSuccesses[i] = letter;
      }
    }
  }

  else {
    wrongLetters.push(letter);
    guessesLeft--;
  }

  // debug
  console.log(blanksAndSuccesses);

}

function roundComplete() {
  console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + numGuesses);

  // update the html to reflect the most recent count stats
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

  // check if user won
  if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert("You Won!");
    document.getElementById("wrongGuesses").innerHTML = " ";

    // update the win counter in the html
    document.getElementById("winCounter").innerHTML = winCount;

    startGame();
  }

  // check if user lost
  else if (guessesLeft == 0) {
    lossCount++;
    alert("You Lost!");
    document.getElementById("wrongGuesses").innerHTML = " ";

    // update html
    document.getElementById("lossCounter").innerHTML = lossCount;

    startGame();
  }

}

// main process
// ===============================================

// intiates the code
startGame();

// registers keyclicks
document.onkeyup = function(event) {
  var lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(lettersGuessed);
  roundComplete();
  // debug
  console.log(lettersGuessed);

}
