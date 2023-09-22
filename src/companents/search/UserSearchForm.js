// UserSearchForm.js
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

import PersonIcon from '@mui/icons-material/Person';

const UserSearchForm = ({ onSearch , onClear}) => {
  const [username, setUsername] = useState('');

  const handleSearch = debounce(() => {
    onSearch(username);
  }, 300);

  const handleChange = (e) => {
    setUsername(e.target.value);
    handleSearch();
  };

  const handleClear = () => {
    setUsername('');
    onClear(); // Bo'sh qidiruv so'rovi yuborish
  };


  return (
    <div>
       <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,  }}
    >
      
      <InputBase
        sx={{ ml: 1, flex: 1}}
        placeholder="Search user name ... "
        inputProps={{ 'aria-label': 'search google maps' }}
        value={username}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon color="primary"/>
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton  sx={{ p: '10px' }} aria-label="directions" onClick={handleClear}>
      {username!=''?<CloseIcon style={{backgroundColor:"#c74e4e" ,color:"#fff",borderRadius:"4px"}}/>:<PersonIcon color="primary"/>}
      </IconButton>
    </Paper>


   
    </div>
  );
};

export default UserSearchForm;
