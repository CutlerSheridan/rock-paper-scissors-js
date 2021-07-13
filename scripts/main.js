//MAIN LOGIC START
console.log("Written by Cutler Sheridan");
console.log("Copyright 2021");
console.log(" ");
console.log("Bottom three hand photos by Sertion - Photos by Fluff, modified by Sertion, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=6867678");

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
const gameResultsFlex = document.querySelector(".game-results-flex");
const gameResultsBanner = document.querySelector(".game-results-banner");

playerHands.forEach(hand => hand.addEventListener("mouseenter", hoverHand));
handSector.addEventListener("mouseleave", unselectAllHands);

playerHands.forEach(hand => hand.addEventListener("click", moveFist));
playerHands.forEach(hand => hand.addEventListener("click", toggleHandOutline));
compHand.addEventListener("animationend", playRound);

document.querySelector("#play-again-button").addEventListener("click", resetRounds);
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
            if (playerRoundWins === 3) {
                playerGameWins++;
                totalGames++;
                showGameOutcome("yes");
            }
            changeOutlineColor(outcome);
            break;
        case "lose":
            if (compRoundWins === 3) {
                compGameWins++;
                totalGames++;
                showGameOutcome("yes");
            }
            changeOutlineColor(outcome);
            break;
        case "tie":
            changeOutlineColor(outcome);
            break;
    }
    updateGames();
}
function showGameOutcome(yesOrNo) {
    if (yesOrNo === "yes") {
        const bannerText = document.querySelector(".game-results-text");
        if (playerRoundWins > compRoundWins) {
            bannerText.textContent = "YOU WON!";
        } else {
            bannerText.textContent = "YOU LOST";
        }
        gameResultsFlex.style.left = "0";
        gameResultsBanner.style.left = "0";
        gameResultsFlex.style.background= "rgba(71,71,71, .4)";
    } else {
        gameResultsFlex.addEventListener("transitionend", removeBanner);
        gameResultsFlex.style.background = "transparent";
        gameResultsBanner.style.left = "5000px";
    }
}
function removeBanner() {
    gameResultsFlex.style.left = "-10000px";
    gameResultsFlex.removeEventListener("transitionend", removeBanner);
    gameResultsBanner.style.left = "-5000px";
}
function resetGame() {
    playerGameWins = 0;
    compGameWins = 0;
    totalGames = 0;

    resetRounds();
    updateGames();
}
function resetRounds() {
    playerRoundWins = 0;
    compRoundWins = 0;

    updateRounds();
    changeOutlineColor("reset");
    compHandImg.setAttribute("src", compMoves[3]);
    showGameOutcome("no");
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
// MAKE RESPONSIVE
// ADD AN "ABOUT" BUTTON INSTEAD OF JUST LOGGING IN THE CONSOLE?