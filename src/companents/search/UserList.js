import React from 'react';
import { List, ListItem, ListItemText ,Stack } from '@mui/material';
import prof_img from '../../logo.svg'
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./status.css"


const UserList = ({ users }) => {

  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
      
             <ListItemText>
             <Grid container className='follow_box'>
                    <Grid item xs={2.5}> <img className="prof_img" src={prof_img}/></Grid>
                      <Grid item xs={6}>
                        <span className='text'>
                          <span
                            className='userName'>
                            <Link className='link' to='/account-user' state={{dataUser:user}}> {user.firstName} </Link>
                            
                          </span>
                          <br />
                          <span className='text_follow_name'>{user.lastName}</span>
                        </span>
                      </Grid>
                      <Grid item xs={1.5}>
                        {/* <App user={user} userId={userId} /> */}
                        
                      </Grid>
                    </Grid></ListItemText>
  
    
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
