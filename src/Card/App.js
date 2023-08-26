import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Typography,

} from '@mui/material';

import VolunteerList from './VolunteerList';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
    
     
 
      <VolunteerList />
    </>
  );
}

export default App;
