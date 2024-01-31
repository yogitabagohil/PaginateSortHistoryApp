import './App.css';
import React, { useState, useEffect } from 'react';
function App() {
  const [data, setData] = useState([]);

   // Simulated API call
   const fetchData = async () => {
    try {
      // Replace with actual API call
      const response = await fetch("https://randomuser.me/api/?results=100");
      const result = await response.json();
console.log("result",result)
      // Simulated response handling
      setData(result.data);
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
  return (
    <div className="App">
      <div>
        <button onClick={fetchData} >Previous</button>
        <span>{ }</span>
        <button>Next</button>
        <button >View History</button>
        <button >Download JSON</button>
      </div>
    </div>
  );
}

export default App;
