import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import VolunteerList from './VolunteerList';
import VolunteerForm from './VolunteerForm';

function App({users}) {
  console.log(users);


  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography variant="h4" align="center" gutterBottom>
        Volunteer Management
      </Typography>
      
  
      <VolunteerList users={users} />
    </Container>
  );
}

export default App;
