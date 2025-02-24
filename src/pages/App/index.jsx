import React from 'react';
import Home from '../Home';
import '../../index.css';
import { AppBar, Stack, Toolbar } from '@mui/material';


function App() {
  return (
    <div className='container'>
      <Stack spacing={4} sx={{ flexGrow: 1}}>
        {/* Barra de navegación fija en la parte superior */}
        <AppBar position="static">
          <Toolbar/>
        </AppBar>
        <Home />
      </Stack>
    </div>
  );
}

export default App;