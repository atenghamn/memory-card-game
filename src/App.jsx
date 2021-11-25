import { useState, useEffect } from 'react';
import './App.css';
import Card from './Components/Card';

function App() {


  const [cards, setCards] = useState([]); 
  const [score, setScore] = useState(1000);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [freeze, setFreeze] = useState()

 
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

      setFreeze(true);

      console.log(cardOne.value);
      console.log(cardTwo.value);
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