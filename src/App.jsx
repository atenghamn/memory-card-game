import { useState, useEffect } from 'react';
import './App.css';
import Card from './Components/Card';


function App() {


  const [cards, setCards] = useState([]); 
 
 
  // Hämtar hela kortleken
  useEffect(() => {

    async function addCards() {
      const res = await fetch (`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
      const data = await res.json();

      setCards(data);  
    
      }
      addCards();
  }, []);



  return (
    <div className="App">
     
     <div className="cardArea">

     {cards.cards !== undefined ? (cards.cards.map(item => (
       <Card card={item}></Card>
     ) )) :  (<p>Loading...</p> )}

    </div>
 
    
     </div>
  );
}

export default App;