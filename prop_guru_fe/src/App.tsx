/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import MyCard from './components/MyCard';
import { Link } from 'react-router-dom';
import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        setData={setData}
        setLoading={setLoading}
        setError={setError}
      ></SearchBar>
      {loading ? (
        <Box height={'100vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {' '}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={2} justifyContent={'center'} alignItems={'flex-start'}>
              {data &&
                data.length > 0 &&
                data.map((el: any) => (
                  <Link key={el._id} to={`card/${el._id}`} state={el}>
                    <Grid xs display="flex" justifyContent="center" alignItems="center">
                      <MyCard productDetails={el}></MyCard>
                    </Grid>
                  </Link>
                ))}
            </Grid>
          </Box>
        </>
      )}

      {error ? (
        <Box height={'100vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
          SOMETHING went Wrong!
        </Box>
      ) : (
        ''
      )}
    </>
  );
}

export default App;
