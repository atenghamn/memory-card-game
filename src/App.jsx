import { within } from '@testing-library/react';
import { useState, useEffect } from 'react';
import './App.css';
import Card from './Components/Card';
import cardBack from './Components/img/pngegg.png';

function App() {


  const [cards, setCards] = useState([]); 
  const [score, setScore] = useState(1000);
  const [matchedCards, setMatchedCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);

 
  // Hämtar hela kortleken
  useEffect(() => {
    async function addCards() {
      const res = await fetch (`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
      const data = await res.json();

      setCards(data);
    console.log(data);
    setCards(prevCards => {
      return prevCards.cards.map(card => {
          card.matched=false;
          return card;      
    })
  });
}
    addCards();
    console.log("__________________________");
    console.log(cards.length)
  }, []);


  const handleChoice = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  }

  useEffect(() => {
    if(cardOne && cardTwo) {
      if(cardOne.value === cardTwo.value) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.code === cardOne.code){
              return {...card, matched: true}
            } else{
              return card;
            }
          })
        })
        resetCards();
      } else {
        resetCards();
      }
    }
  }, [cardOne, cardTwo]);


  const resetCards = () => {
    setCardOne(null);
    setCardTwo(null);
    setScore(score - 1);
  }



  return (
    <div className="App">
     
      <div className="cardArea">

  
     {cards.length === 52 ? (cards.map(card => ( 

        <Card 
        card={card}
        key = {card.code}
        handleChoice = {handleChoice}
        flipped={card === cardOne || card === cardTwo || card.matched === true}
  
        ></Card>
      
     ) )) :  (<p>Loading...</p> )}

    </div>
 
     </div>
  );

     }

export default App;