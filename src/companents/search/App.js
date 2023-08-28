// src/App.js

import React, { useState } from 'react';
import UserSearchForm from '../search/UserSearchForm';
import UserList from '../search/UserList';

const App = () => {
  const [users, setUsers] = useState([]);

  const searchUsers = async (userName) => {
    try {
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

  console.log(users);
  return (
    <div>

      <UserSearchForm onSearch={searchUsers} />
      <UserList users={users} />
    </div>
  );
  
};

export default App;

