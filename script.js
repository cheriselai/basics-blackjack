// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

var GAME_MODES = "";
var suiBianDeck; //shuffle cards
var scoreboard = {
  playerScore: 0,
  computerScore: 0,
};
var playerInitialDraw;
var computerInitialDraw;
var drawNum = 1;
var output = "";
var playerCards = []; //player cards array
var computerCards = []; //computer cards array
var playerDraw;

//card deck generation
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // set rank value same as rankCounter
      var rank = rankCounter;

      // If cardName is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        rank = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        rank = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        rank = 10;
      } else if (cardName == 13) {
        cardName = "King";
        rank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank,
      };

      // Add the new card to the deck
      cardDeck.push(card);
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// draw 1 card
var drawCard = function (cardDeck) {
  return cardDeck.pop();
};

// intial draw 2 cards
var drawTwoCards = function (suiBianDeck) {
  return [drawCard(suiBianDeck), drawCard(suiBianDeck)];
};

// sum of all cards
var sumOfNCards = function (cardArray) {
  var sum = 0;
  for (var i = 0; i < cardArray.length; i++) {
    sum += cardArray[i].rank;
  }
  return sum;
};

//finds out if cards is more than 5
var moreThanFive = function (hand) {
  return hand.length > 5;
};

//finds out if total score more than 21
var busted = function (hand) {
  return scoreboard[hand] > 21;
};

var checkBusted = function () {};

// calculate winner
var calculateScore = function () {
  if (scoreboard.playerScore < scoreboard.computerScore) {
    return `Computer won!`;
  } else {
    return `Player won!`;
  }
};

var playerCardsOutput = function () {
  return `Player: Total points ${scoreboard.playerScore}
  <br>${playerInitialDraw[0].name} of ${playerInitialDraw[0].suit}
  <br>${playerInitialDraw[1].name} of ${playerInitialDraw[1].suit}`;
};

var computerCardsOutput = function () {
  return `Computer: Total points ${scoreboard.computerScore}
  <br>${computerInitialDraw[0].name} of ${computerInitialDraw[0].suit}
  <br>${computerInitialDraw[1].name} of ${computerInitialDraw[1].suit}`;
};

var main = function (input) {
  if (GAME_MODES == "") {
    // create shuffled deck
    suiBianDeck = shuffleCards(makeDeck());
    // player draw 2 cards
    playerInitialDraw = drawTwoCards(suiBianDeck);
    // computer draw 2 cards
    computerInitialDraw = drawTwoCards(suiBianDeck);
    // add into player score
    scoreboard.playerScore = sumOfNCards(playerInitialDraw);
    // add into computer score
    scoreboard.computerScore = sumOfNCards(computerInitialDraw);
    // add into player card array
    playerCards.push(...playerInitialDraw);
    // add into computer card array
    computerCards.push(...computerInitialDraw);
    GAME_MODES = "START";
    console.log(playerCards);
    console.log(computerCards);
    console.log(suiBianDeck);

    output = `${computerCardsOutput()}
    <br>
    <br>${playerCardsOutput()}`;

    if (scoreboard.playerScore > 21) {
    }

    // check if blackjack
    if (scoreboard.playerScore == 21) {
      output += "<br><br>Blackjack! Player won!";
    } else if (scoreboard.computerScore == 21) {
      output += "<br><br>Blackjack! Computer won!";
    }

    return output;
  } else if (GAME_MODES == "START") {
    if (input === "hit") {
      // draw next card
      playerDraw = drawCard(suiBianDeck);
      //add into player score
      scoreboard.playerScore += playerDraw.rank;
      //add into player card array
      playerCards.push(playerDraw);
      console.log(playerCards);

      output = `${computerCardsOutput()}
      <br>
      <br>${playerCardsOutput()}
      <br>${playerDraw.name} of ${playerDraw.suit}`;

      if (moreThanFive(playerCards) || busted("playerScore")) {
        output += `<br><br>Player busted. Computer win!`;
      }

      return output;
    } else if (input === "stand") {
      // computer: if not busted or not more than 5 card, keeps drawing card
      while (!busted("computerScore") && !moreThanFive(computerCards)) {
        //draw next card
        var computerDraw = drawCard(suiBianDeck);
        //add into computer score
        scoreboard.computerScore += computerDraw.rank;
        //add into computer card array
        computerCards.push(computerDraw);
        console.log(computerCards);
      }
      return calculateScore();
      // output = `${computerCardsOutput()}
      //   <br>${computerDraw.name} of ${computerDraw.suit}}
      //   <br>
      //   <br>${playerCardsOutput()}
      //   <br>${playerDraw.name} of ${playerDraw.suit}}
      //   <br>
      //   <br>${calculateScore()}`;
    } else if (input === "") {
      return `Please input hit or stand.`;
    }

    console.log(GAME_MODES);
  }
};
