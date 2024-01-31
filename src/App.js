import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, Pagination } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

   // Simulated API call
   const fetchData = async () => {
    try {
      // Replace with actual API call
      const response = await fetch("https://randomuser.me/api/?results=100");
      const result = await response.json();

      // Simulated response handling
      setData(result.data);
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
  return (
    <div className="App">
      <div>
        <Button onClick={fetchData} >Previous</Button>
        <span>{ }</span>
        <Button>Next</Button>
        <Button >View History</Button>
        <Button >Download JSON</Button>
        <Pagination
        count={10}  
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
      />
      </div>
    </div>
  );
}

export default App;
