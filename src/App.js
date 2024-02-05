import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Container, Typography } from '@mui/material';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);

  
  const [visitHistory, setVisitHistory] = useState(() => {
    const storedHistory = localStorage.getItem('visitHistory');
    console.log("storedHistory",storedHistory)
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=100`);
      const result = await response.json();
      setData(result.results);
      updateVisitHistory(result.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const updateVisitHistory = (newData) => {
    const currentTime = new Date().toLocaleString();
    setVisitHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, { data: newData, visitedTime: currentTime }];
      localStorage.setItem('visitHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    updateVisitHistory(newPage)
  };

  const handleSort = () => {
    // Sort the data based on gender
    const sortedData = [...data].slice((currentPage - 1) * 10, currentPage * 10).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.gender.localeCompare(b.gender);
      } else {
        return b.gender.localeCompare(a.gender);
      }
    });

    // Update the state with the sorted data
    setData((prevData) => {
      const newData = [...prevData];
      newData.splice((currentPage - 1) * 10, currentPage * 10, ...sortedData);
      return newData;
    });
// Update visit history with sorted data
  updateVisitHistory(sortedData); 
    // Toggle the sorting order for the next click
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleViewHistory = () => {
    console.log("visitHistory",JSON.stringify(visitHistory, null, 2))
    // Display the visit history in an alert
    alert(JSON.stringify(visitHistory, null, 10));
  };

  return (
    <Container style={{ marginTop: '50px', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        User Data Table with Pagination
      </Typography>
      
      <Button variant="contained" color="primary" onClick={handleSort} style={{ marginBottom: '20px' }}>
        Sort by Gender
      </Button>
      <Button variant="contained" color="primary" onClick={handleViewHistory} style={{ marginBottom: '20px', marginLeft:'20px' }}>
        View History
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? data.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{`${item.name.first} ${item.name.last}`}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.gender}</TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>

      {data && data.length > 0 ? (
        <Pagination
          count={Math.ceil(data.length / 10)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: '20px', '& .MuiPaginationItem-root': { borderRadius: '5px', marginRight: '8px' } }}
        />
      ) : null}
    </Container>
  );
};

export default App;
