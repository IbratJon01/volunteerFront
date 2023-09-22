import React, {useState } from 'react';
import Drawer from './Drawer'
import { Box } from '@mui/material'
import Navbar from './Navbar'
import CardList from '../demo/VolunteerList';
import {
  getAllVolunteers
} from '../Volunteer/VolunteerService';



export default function Members() {
  const [users, setUsers] = useState([]);
  const searchUsers = async (userName) => {
    try {
      if (userName.length<2 ) {
        const response = await getAllVolunteers();
        setUsers(response.data);
        return;
      }
      const response = await fetch(`http://localhost:8080/api/volunteers/search?userName=${userName}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Something went wrong while fetching users.');
      }
    } catch (error) {
      console.error('Error occurred during API call:', error);
    }
  };

  return (
    <> 
     <Navbar onSearch={searchUsers}/>
    <Box sx={{ display: 'flex' }}>
    <Drawer/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CardList users={users}/>
        </Box>
    </Box>
  
    </>
  )
}
