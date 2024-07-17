const mainDeck = createDeck();
let discarded = [];
let deckOne = [];
let deckTwo = [];
let currentCard1 = undefined;
let currentCard2 = undefined;
let playerOneTurn = true;
let leftCards = 52;

// function to change the card shown on index.html:
function changeCard1(){

    if (playerOneTurn && leftCards>0){
    let card = getRandomCard() ;
    document.getElementById('Card1').src = 'Images/' + card+ '.png';
    currentCard1=card;
    leftCards --;
    playerOneTurn = false;
    if (checkCards()) {
        console.log('Sunt egale');
        battleOn();
    } else {
        battleOff();
    }
   }
  }
function changeCard2(){
    if (!playerOneTurn && leftCards>0){
    let card = getRandomCard() ;
    document.getElementById('Card2').src = 'Images/' + card+ '.png';
    currentCard2=card;
    playerOneTurn = true;
    leftCards --;
    if (checkCards()) {
        console.log('Sunt egale');
        battleOn();
    } else {
        battleOff();
    }
}

}

// function to create a deck of 52 cards and 2 jokers:
function createDeck(){
    const DECK = ['1s', '1h', '1d', '1c', '2s', '2h', '2d', '2c', '3s', '3h', '3d', '3c', '4s', '4h', '4d', '4c', '5s', '5h', '5d', '5c', '6s', '6h', '6d', '6c', '7s', '7h', '7d', '7c', '8s', '8h', '8d', '8c', '9s', '9h', '9d', '9c', '10s', '10h', '10d', '10c', '12s', '12h', '12d', '12c', '13s', '13h', '13d', '13c', '14s', '14h', '14d', '14c'];
    return DECK;
   }

// function to take a card from the mainDeck and put it into the discarded pile:   
function getRandomCard(){
    let i = 1 + Math.floor((mainDeck.length-1) * Math.random());
    discarded.push(mainDeck[i]);
    let card = mainDeck.splice(i,1);
    console.log(discarded);
    console.log(mainDeck);
    return card;
}   

// function to split the deck of cards into two equal decks, one for each player:
function splitDeck(){  
  deckOne = createDeck();
  deckTwo = [];
  while (deckOne.length>27){
    let i = 1 + Math.floor((deckOne.length-1) * Math.random());
    deckTwo.push(deckOne[i]);
    deckOne.splice(i,1);
 }
}

// function to shuffle a specific deck:
function shuffle(deck){
           for (var i = deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
       console.log(deck);
    }

    // function to check if the two current cards are equal:
     function checkCards(){
        let card1 = currentCard1[0];
        let card2 = currentCard2[0];
    if (card1.substring(0, card1.length - 1) === card2.substring(0, card2.length - 1)){
        return true;
    }
    return false;
}

// function to start battle:
function battleOn(){
    document.getElementById('testP').innerText = 'BATALIEEEEEEE!'
}

function battleOff(){
    document.getElementById('testP').innerText = '';
}

// function to move a card from a playerțs deck to the other:
// function captureCard(){
//     let card1 = currentCard1[0];
//     let card2 = currentCard2[0];

//     if (currentCard1 ){

//     }
// }