//MAIN LOGIC START
let playerRoundWins = 0;
let compRoundWins = 0;
let playerGameWins = 0;
let compGameWins = 0;
let totalGames = 0;
let playerChoice;
const compMoves = ["images/rock-upright.png", "images/paper-upright.png", "images/scissors-upright.png", "images/fist-upright.png"];

const root = document.querySelector(":root");
const playerRounds = document.querySelector("#player-rounds");
const compRounds = document.querySelector("#comp-rounds");
const resultsText = document.querySelector("#results");
const playerGames = document.querySelector("#player-games");
const compGames = document.querySelector("#comp-games");
const gamesTotal = document.querySelector("#games-total");
const compHand = document.querySelector("#comp-hand");
const compHandImg = document.querySelector("#comp-hand>img");
const playerHandsNodes = document.querySelectorAll(".hand");
const playerHands = Array.from(playerHandsNodes);
const handSector = document.querySelector("#player-hands");

playerHands.forEach(hand => hand.addEventListener("mouseenter", hoverHand));
handSector.addEventListener("mouseleave", unselectAllHands);

playerHands.forEach(hand => hand.addEventListener("click", moveFist));
playerHands.forEach(hand => hand.addEventListener("click", toggleHandOutline));
compHand.addEventListener("animationend", playRound);
document.querySelector("#reset-button").addEventListener("click", resetGame);
//MAIN LOGIC END

// STYLE LOGIC START
function hoverHand() {
    const hoveredHand = playerHands.indexOf(this);

    for (let i = 0; i < playerHands.length; i++) {
        if (i === hoveredHand) {
            this.classList.remove("unselected-hand");
            this.classList.add("selected-hand");
        } else {
            playerHands[i].classList.remove("selected-hand");
            playerHands[i].classList.add("unselected-hand");
        }
    }
}
function unselectAllHands() {
    playerHands.forEach(hand => hand.classList.remove("unselected-hand"));
    playerHands.forEach(hand => hand.classList.remove("selected-hand"));
}
function moveFist() {
    // set img back to fist
    compHandImg.setAttribute("src", compMoves[3]);
    changeOutlineColor("reset");
    compHand.classList.remove("moving-fist");
    // this causes a DOM reflow which allows animation to restart if interrupted
    void compHand.offsetWidth;
    compHand.classList.add("moving-fist");
    playerChoice = this;
    if (playerRoundWins === 3 || compRoundWins === 3) {
        playerRoundWins = 0;
        compRoundWins = 0;
        updateRounds();
    }
}
function toggleHandOutline() {
    // this conditional checks if triggered by next move or full reset
    if (arguments[0]) {
        this.classList.add("clicked-hand");
    }
    playerHands.forEach(hand => {
        if (hand === this) {
            hand.classList.add("clicked-hand");
        } else {
            hand.classList.remove("clicked-hand");
        }
    });
}
function changeOutlineColor(gameResult) {
    let playerColor = "transparent";
    let compColor = "transparent";
    switch (gameResult) {
        case "win":
            playerColor = "var(--clr-green)";
            compColor = "var(--clr-red)";
            break;
        case "lose":
            playerColor = "var(--clr-red)";
            compColor = "var(--clr-green)";
            break;
        case "tie":
            playerColor = "var(--clr-off-white)";
            compColor = "var(--clr-off-white)";
            break;
    }
    root.style.setProperty("--clr-player-hand", playerColor);
    root.style.setProperty("--clr-comp-hand", compColor);
}
// STYLE LOGIC END

// GAME LOGIC START
function playRound() {
    console.log(arguments[0]);

    const playerMove = determineMove(playerHands.indexOf(playerChoice));
    console.log("\nplayer chose " + playerMove);
    const compMoveNum = random(3);
    const compMove = determineMove(compMoveNum);
    console.log("comp chose " + compMove);

    // INSERT CODE FOR COMP MOVE ANIMATION
    compHandImg.setAttribute("src", compMoves[compMoveNum]);

    switch (true) {
        case (playerMove === compMove):
            getAndShowResults("tie");
            break;
        case (playerMove == "rock" && compMove == "scissors"):
        case (playerMove == "paper" && compMove == "rock"):
        case (playerMove == "scissors" && compMove == "paper"):
            playerRoundWins++;
            getAndShowResults("win");
            break;
        default:
            compRoundWins++;
            getAndShowResults("lose");
    }

}
function determineMove(chosenHandIndex) {
    switch (chosenHandIndex) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}
function getAndShowResults(outcome) {
    updateRounds();
    switch (outcome) {
        case "win":
            //resultsText.textContent = `You won this `;
            if (playerRoundWins === 3) {
                playerGameWins++;
                totalGames++;
                //resultsText.textContent += "game!!!";
            } else {
                //resultsText.textContent += "round!";
            }
            changeOutlineColor("win");
            break;
        case "lose":
            //resultsText.textContent = "You lost this ";
            if (compRoundWins === 3) {
                compGameWins++;
                totalGames++;
                //resultsText.textContent += "game. :(";
            } else {
                //resultsText.textContent += "round.";
            }
            changeOutlineColor("lose");
            break;
        case "tie":
            //resultsText.textContent = "You tied this round.";
            changeOutlineColor("tie");
            break;
    }
    updateGames();
}
function resetGame() {
    playerRoundWins = 0;
    playerGameWins = 0;
    compRoundWins = 0;
    compGameWins = 0;
    totalGames = 0;

    updateRounds();
    updateGames();
    toggleHandOutline();
    resultsText.textContent = "Choose your move.";
    compHandImg.setAttribute("src", compMoves[3]);
}
function updateRounds() {
    playerRounds.textContent = playerRoundWins;
    compRounds.textContent = compRoundWins
}
function updateGames() {
    playerGames.textContent = playerGameWins;
    compGames.textContent = compGameWins;
}
// get random number
function random(upperBound) {
    return Math.floor(Math.random() * upperBound);
}
//determine if an "s" is needed to make word plural
function pluralize(numOfItems) {
    if (numOfItems === 1) {
        return "";
    }
    else {
        return "s";
    }
}
// GAME LOGIC END

// ADD SOMETHING WHERE USER CAN CLICK "PLAYER" AND CHANGE IT TO USER'S NAME