import { useState, useEffect } from 'react';
import './App.css';
import Card from './Components/Card';
import WinModal from './Components/WinModal';

function App() {


  const [cards, setCards] = useState([]); 
  const [score, setScore] = useState(1000);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [freeze, setFreeze] = useState()
  const [showModal, setShowModal] = useState(false);

 
  useEffect(() => {
    // Get the cards
    async function addCards() {
      const res = await fetch (`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
      const data = await res.json();

      console.log(data);
      setCards(data);
      // Run map to add a matched key to every card in the deck
    setCards(prevCards => {
      return prevCards.cards.map(card => {
          card.matched=false;
          return card;      
    })
  });
}
    addCards();
  }, []);

  // Set the card to either cardOne or cardTwo to prevenet it from beeing to many active cards
  const handleChoice = (card) => {;
    cardOne ? setCardTwo(card) : setCardOne(card);
    winCheck();
  }

  useEffect(() => {
    // Make sure we got to active cards
    if(cardOne && cardTwo) {
      // Freeze so you cant flip more than two cards at the same time
      setFreeze(true);
      // Check for a match
      if(cardOne.value === cardTwo.value) {
        // If they match change matched to true in for the two cards
        setCards(prevCards => {
         return prevCards.map(card => {
           winCheck();
            if(card.code === cardOne.code || card.code === cardTwo.code){
              return {...card, matched: true}
            } else{
              return card;
            }
          })
        })
        // Call the reset function so that we can have two new cards, stop the freeze and count down the score
        resetCards();
      } else {
        // Do the same as above but with a slight delay so that you can check the value of the second card
        setTimeout(() => resetCards(), 1500);
 
      }
    }
  }, [cardOne, cardTwo]);

  
  // If 50 cards are matched (if you got only two cards left there are nothing more to guess on) then you win. 
  const winCheck = () => {
    let matchedCards = 0;
    cards.forEach(card => {
      if(card.matched){
        matchedCards += 1;
      }
    })
    // When ther's only two cards left you win! 
    if (matchedCards >= 50){
      setShowModal(true);
    }
   
  }

  // Reset the two active cards and decrement the score by 1. 
  const resetCards = () => {
    setCardOne(null);
    setCardTwo(null);
    setScore(score - 1);
    setFreeze(false);
  }

  
  // showModal variabl controlls wich elements are displayed
  return (
    <div className="App">
      
      {!showModal &&
       <div>Current score is: {score}</div>
      }
    {showModal && 
      <WinModal score={score}/>
    }
    {!showModal && 
      <div className="cardArea">

       

    {/* Map em out... */}
     {cards.length === 52 ? (cards.map(card => ( 

        <Card 
        card={card}
        key = {card.code}
        handleChoice = {handleChoice}
        winCheck = {winCheck}
        flipped={card === cardOne || card === cardTwo || card.matched === true}
        freeze={freeze}
  
        ></Card>
      
     ) )) :  (<p>Loading...</p> )}

    </div>
    }
     </div>
  );

     }

export default App;