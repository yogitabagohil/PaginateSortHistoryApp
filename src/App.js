import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=100`);
      const result = await response.json();
      setData(result.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>

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
            )): null}
          </TableBody>
        </Table>
      </TableContainer>

      {data && data.length > 0 ? (
  <Pagination
    count={Math.ceil(data.length / 10)}
    page={currentPage}
    onChange={handlePageChange}
    color="primary"
  />
) : null}
    </div>
  );
};

export default App;
