let playerRoundWins;
let compRoundWins;
let playerGameWins = 0;
let compGameWins = 0;
let totalGames = 0;

//MAIN LOGIC START
console.log("Welcome to Rock, Paper, Scissors!" +
    "\nGet ready for the most exciting game of your life." +
    "\nEach game is won by the first player to win three times." +
    "\nReady?");
let keepPlaying = true;
do {
    oneGame();
    keepPlaying = getPlayAgainAnswer();
}while(keepPlaying)
console.log("\nThanks for playing!");
//MAIN LOGIC END

function oneGame() {
    playerRoundWins = 0;
    compRoundWins = 0;

    oneRound(playerPlay("What will your first move be?"), compPlay());
    while(playerRoundWins < 3 && compRoundWins < 3) {
        oneRound(playerPlay("What's your next move?"), compPlay());
    }
    if(playerRoundWins == 3) {
        console.log("\nYou win this game!!!  Congratulations!");
        playerGameWins++;
    }
    else {
        console.log("\nYou lose this game.  Too bad.");
        compGameWins++;
    }
    console.log(`You've won ${playerGameWins} game${pluralize(playerGameWins)} ` +
        `versus the computer's ${compGameWins} out of ${++totalGames} ` +
        `total game${pluralize(totalGames)}.`);
}
function oneRound(playerMove, compMove) {
    console.log(`\nYou played ${playerMove}, the computer played ${compMove}.`);
    switch(true) {
        case (playerMove == "rock" && compMove == "scissors"):
        case (playerMove == "paper" && compMove == "rock"):
        case (playerMove == "scissors" && compMove == "paper"):
            console.log(`You win this round!`);
            playerRoundWins++;
            break;
        case (playerMove == "rock" && compMove == "paper"):
        case (playerMove == "paper" && compMove == "scissors"):
        case (playerMove == "scissors" && compMove == "rock"):
            console.log(`You lose this round.`);
            compRoundWins++;
            break;
        default:
            console.log("You tied this round.");
            break;
    }
    console.log(`That's ${playerRoundWins}/3 to ${compRoundWins}/3.`);
}
function playerPlay(message) {
    let move = prompt(message);
    if (move === "rock" || move === "paper" || move === "scissors") {
        return move;
    }
    else {
        return playerPlay("Please enter rock, paper, or scissors.");
    }
}
function compPlay() {
    let move = random(3);
    switch(move) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}
function getPlayAgainAnswer() {
    let answer = prompt("Would you like to play again?").toLowerCase();
    if(answer == "yes" || answer == "y") {
        return true;
    }
    else if(answer == "no" || answer == "n") {
        return false;
    }
    else {
        return getPlayAgainAnswer();
    }
}
// get random number
function random(upperBound) {
    return Math.floor(Math.random() * upperBound);
}
//determine if an "s" is needed to make word plural
function pluralize(numOfItems) {
    if(numOfItems == 1) {
        return "";
    }
    else {
        return "s";
    }
}