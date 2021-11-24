import { useState, useEffect } from 'react';
import './App.css';
import Card from './Components/Card';


function App() {


  const [cards, setCards] = useState([]); 
  const [container, setContainer] = useState("");
  const [count, setCount] = useState(1);
 
  // Hämtar hela kortleken
  useEffect(() => {

    async function addCards() {
      const res = await fetch (`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
      const data = await res.json();

      console.log(data);

  

      setCards(data);  
    
      }
      addCards();
  }, []);





  function turnCardClick(e) {

 
    if (count === 1) {
      console.log("Count är: " + count);
     
      setContainer(e.value);

      console.log(e.value + " ska matcha med");
      console.log("detta värde " +container)
      setCount(count + 1);
    }
    else if( count === 2){
      console.log("Count är: " + count);
      console.log(e.value + " ska matcha med");
      console.log("detta värde " +container)

      if(e.value === container) {
          console.log("Match!");
          setCount(1)
        } 

        setCount(1);
      }
     
    }
    
  

  
  

  

  return (
    <div className="App">
     
     <div className="cardArea">

  
     {cards.cards !== undefined ? (cards.cards.map(item => (
       
      <div 
      key={item.code}
      onClick = {(e) => turnCardClick(item)}
      >
        <Card card={item}

        ></Card>
      </div>
       
     ) )) :  (<p>Loading...</p> )}

    </div>
 
     </div>
  );
}

export default App;