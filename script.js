const mainDeck = createDeck();
let discarded = [];
let deckOne = [];                    // first player's deck of cards
let deckTwo = [];                    // second player's deck of cards
let currentCard1 ;
let currentCard2 ;
let playerOneTurn = true;
let gameOn = false;   
let isBattle = false;               // true if game started, false if game not started;
let battleNumber = 0;  
var x = document.getElementById("myAudio");                 

// Function to create a deck of 52 cards:
function createDeck() {
    const DECK = ['15s', '15h', '15d', '15c', '2s', '2h', '2d', '2c', '3s', '3h', '3d', '3c', '4s', '4h', '4d', '4c', '5s', '5h', '5d', '5c', '6s', '6h', '6d', '6c', '7s', '7h', '7d', '7c', '8s', '8h', '8d', '8c', '9s', '9h', '9d', '9c', '10s', '10h', '10d', '10c', '12s', '12h', '12d', '12c', '13s', '13h', '13d', '13c', '14s', '14h', '14d', '14c'];
    return DECK;

}

// function to reset (erase) center cards:
function resetCenterCards(){
    document.getElementById('Card1').src = 'Images/empty.png';
    document.getElementById('Card2').src = 'Images/empty.png';
}

// function to reset the deck images:
function resetDeckImages(){
    document.getElementById('backCard1').src = 'Images/bkgb.png'
    document.getElementById('backCard2').src = 'Images/bkgr.png'
}



// function to play audio:
function playSound() { 
  x.play(); 
} 


// Functions to change the cards shown on index.html
function changeCard1() {
    
    if (playerOneTurn && deckOne.length > 0 && gameOn && !isBattle) {
        let card = playCard(deckOne);
        playSound();
        document.getElementById('Card1').src = 'Images/' + card + '.png';

        currentCard1 = card;
        playerOneTurn = false;
        refreshLength();
        battleOff();
    }
}

function changeCard2() {
    if (!playerOneTurn && deckTwo.length > 0 && gameOn) {
        gameOn = false;
        let card = playCard(deckTwo);
        playSound();

        document.getElementById('Card2').src = 'Images/' + card + '.png';
        currentCard2 = card;
        refreshLength();
        win();
        captureCard();
        battleOff();
        playerOneTurn = true;

        setTimeout(() => {
            gameOn = true;
           win();
        }, 1000);  
    }
}

// Function to take a random card from the mainDeck and put it into the discarded pile(s)
function getRandomCard() {
    let i = Math.floor(mainDeck.length * Math.random());
    let card = mainDeck.splice(i, 1)[0];
    discarded.push(card);
    
    if (playerOneTurn) {
       deckOne.push(card);
    } else {
       deckTwo.push(card);
    }
    return card;
}

// Function to split the deck of cards into two equal decks, one for each player
function splitDeck() {
    
    let tempDeck = [...mainDeck];
    deckOne = [];
    deckTwo = [];
    while (tempDeck.length > 0) {
        deckOne.push(tempDeck.shift());
        if (tempDeck.length > 0) {
            deckTwo.push(tempDeck.shift());
        }
    }
    shuffle(deckOne);
    shuffle(deckTwo);
    refreshLength();
    resetCenterCards();
    gameOn = true;
    resetDeckImages();

}

// function to take the first card from the chosen deck:
function playCard(deck){
    return deck.shift();
}

// Function to shuffle a specific deck
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to check if the two current cards are equal
function checkCards() {
    if (currentCard1 && currentCard2) {
        let card1 = currentCard1.slice(0, -1);
        let card2 = currentCard2.slice(0, -1);
        return card1 === card2;
    }
    return false;
}

// function to show the Start Battle Button:
function battleOn(){
    isBattle = true;
    document.getElementById("sBattle").style.display = "flex";
    document.getElementById("sBattle").style.visibility = "visible";

}


// Function to start battle
function startBattle() {
    
    document.getElementById('testP').innerText = 'FIIIGHT!!!!!';
    battleNumber = Number(currentCard1.slice(0, -1))

   
    let tempDeck = [];
    tempDeck.push(currentCard1);
    tempDeck.push(currentCard2);

    if (deckOne.length < battleNumber){
        battleNumber = deckOne.length;
        
    } else if (deckTwo.length < battleNumber){
        battleNumber = deckTwo.length;
       

    }

    let delay = 0;
    for (let i = 1; i <= battleNumber; i++) {
        setTimeout(() => {
            let card1 = playCard(deckOne);
            playSound();
            document.getElementById('Card1').src = 'Images/' + card1 + '.png';
            currentCard1 = card1;
            playerOneTurn = false;
            tempDeck.push(card1);
            refreshLength();

            let card2 = playCard(deckTwo);
            playSound();
            document.getElementById('Card2').src = 'Images/' + card2 + '.png';
            currentCard2 = card2;
            playerOneTurn = true;
            tempDeck.push(card2);
            refreshLength();
        }, delay);
        delay += 500;  // Adjust the delay for each card
    }

    setTimeout(() => {
        if (Number(currentCard1.slice(0, -1)) > Number(currentCard2.slice(0, -1))) {
            deckOne.push(...tempDeck);
            document.getElementById('testP').innerText = 'Player One Wins!';


        } else if (Number(currentCard1.slice(0, -1)) < Number(currentCard2.slice(0, -1))) {
            deckTwo.push(...tempDeck);
            document.getElementById('testP').innerText = 'Player Two Wins!';
            
        } else {
            battleOn();
            return;

        }    
        
        refreshLength();
        resetCenterCards();
        win();
    }, delay + 500);  // Adjust the timing to clear cards after the battle
    battleOff();
}

// function to stop battle
function battleOff() {
    isBattle = false;
    document.getElementById("sBattle").style.visibility = "hidden";
    document.getElementById('testP').innerText = '';
}

// function to capture card:
function captureCard(){
    let i = compareCards();
    switch (i){
        case 0:
            setTimeout(() => {
                battleOn();
                battleNumber = Number(currentCard1.slice(0, -1));
            }, 0);
            break;

        case 1:
            deckOne.push(currentCard1);
            deckOne.push(currentCard2);
            break;
        case 2:
            deckTwo.push(currentCard1);
            deckTwo.push(currentCard2);
            break;    
    }

   if (i !== 0){

    setTimeout(() => {
        resetCenterCards(); 
        refreshLength();
        win();
    }, 1000);  
}
}

// function to refresh the text with the decks' length:
function refreshLength(){
    document.getElementById('cards1').innerText = 'PLAYER 1 - cards left: ' + deckOne.length;
    document.getElementById('cards2').innerText = 'PLAYER 2 - cards left: ' + deckTwo.length;
}

// function to compare cards:
function compareCards(){
    let status = 0;
    let card1 = Number(currentCard1.slice(0, -1));
    let card2 = Number(currentCard2.slice(0, -1)); 
    if (card1 > card2) {
        status = 1
    } else if (card1 < card2) {
        status = 2
    }
    return status;
}

// function to win the game:
function win(){
    if (gameOn && deckOne.length < 1){
         document.getElementById('backCard1').src = 'Images/empty.png'
         document.getElementById('testP').innerText = 'Player 2 Wins! Congratulations!'
         gameOn = false;
    } else if (gameOn && deckTwo.length < 1){
         document.getElementById('backCard2').src = 'Images/empty.png'
         document.getElementById('testP').innerText = 'Player 1 Wins! Congratulations!'
         gameOn = false;
    }
    
}

// function for the help popup
function help(){
    const helpMessage = `Card Battle Game Instructions

Setup:
The deck is split equally between two players.

Gameplay:

Draw Cards:
Each player draws the top card from their deck.
The player with the higher card wins both cards.

Tie (Battle):
If the cards are equal, a battle starts.
Each player draws a number of cards equal to the value of the tied cards (or as many as they have if fewer).
The highest card among the drawn cards wins the battle, taking all drawn cards.

Winning:
The game continues until one player has all the cards.
The player who runs out of cards loses the game.

Buena Suerte!`
    alert(helpMessage);
}