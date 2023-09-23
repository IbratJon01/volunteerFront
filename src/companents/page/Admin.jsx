import React, {useState } from 'react';
import Drawer from './Drawer'
import { Box } from '@mui/material'
import Navbar from './Navbar'
import AdminList from '../Volunteer/App';
import {
  getAllVolunteers
} from '../Volunteer/VolunteerService';

export default function Admin(props) {

  const [users, setUsers] = useState([]);
  const searchUsers = async (userName) => {
   
    try {
      if (userName.length < 2 ) {
        // Agar userName bo'sh bo'lsa, bo'sh ro'yxatni ko'rsatish uchun users ni tozalab tashlash
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
     <Navbar onSearch={searchUsers} userId={props.userId}/>
    <Box sx={{ display: 'flex' }}>
    <Drawer/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
           <AdminList users={users}/>
        </Box>
    </Box>
  
    </>
  )
}
