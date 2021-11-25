import { useState, useEffect } from 'react';
import './App.css';
import Card from './Components/Card';

function App() {


  const [cards, setCards] = useState([]); 
  const [score, setScore] = useState(1000);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [freeze, setFreeze] = useState()

 
  useEffect(() => {
    // Get the cards
    async function addCards() {
      const res = await fetch (`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
      const data = await res.json();

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
  const handleChoice = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
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
            if(card.value === cardOne.value){
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


  const resetCards = () => {
    setCardOne(null);
    setCardTwo(null);
    setScore(score - 1);
    setFreeze(false);
  }



  return (
    <div className="App">
     
      <div className="cardArea">

    {/* Map em out... */}
     {cards.length === 52 ? (cards.map(card => ( 

        <Card 
        card={card}
        key = {card.code}
        handleChoice = {handleChoice}
        flipped={card === cardOne || card === cardTwo || card.matched === true}
        freeze={freeze}
  
        ></Card>
      
     ) )) :  (<p>Loading...</p> )}

    </div>
      <div>Your score is {score}</div>
     </div>
  );

     }

export default App;