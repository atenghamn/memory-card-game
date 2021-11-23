import { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const data = await res.json();
      setData(data);
    }
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="App">
      <button></button>
    </div>
  );
}

export default App;
