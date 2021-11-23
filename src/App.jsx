import { useState, useEffect } from 'react';
import './App.css';
import Card from './Components/Card';


function App() {

  const [apiData, setApiData] = useState([]);
  const [id, setId] = useState("");
  const [card, setCard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const data = await res.json();
      setApiData(data);
      setId(data.deck_id);
    }
    
    fetchData();
  }, []);

  useEffect(() => {
    async function displayCard() {
      const res = await fetch (`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`);
      const data = await res.json();
      setCard(data.cards[0]);
    }
    displayCard();
  }, []);



  return (
    <div className="App">
  

    <Card card={card}></Card>
      

    <button onClick={() => {
        console.log(apiData)
      
        for(let i = 0; i < apiData.remaining; i++){
          console.log("hej");
          // Do something to populate everycard
        }

      }}>TEST</button>
     </div>
  );
}

export default App;
