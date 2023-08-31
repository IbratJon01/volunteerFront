import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography , ListItem,ListItemButton,ListItemText } from '@mui/material';
import imageProfile from '../../images/004.webp';
import './style.css';
import Rating from '@mui/material/Rating';
// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VolunteerCard = ({ volunteer }) => {
  return (
    <div className='body1'>
        <div class="profile-card_bir" >
            <div class="image">
                <img src={imageProfile} alt="" class="profile-img"/>
            </div>
            <div class="text-data">
                <span class="name">{volunteer.firstName} {volunteer.lastName}</span>
                <span class="job">YouTuber & Blogger</span>
            </div>
            <div class="media-buttons">
                {/* <a href="#" style="background: #4267b2;" class="link">
                    <i class="bx bxl-facebook"></i>
                </a>
                <a href="#" style="background: #e1306c;" class="link">
                    <i class="bx bxl-instagram"></i>
                </a>
                <a href="#" style="background: #1da1f2;" class="link">
                    <i class="bx bxl-twitter"></i>
                </a>
                <a href="#" style="background: #ff0000;" class="link">
                    <i class="bx bxl-youtube"></i>
                </a> */}
            </div>
            <div class="buttons">
                
                {/* <button class="button">Message</button> */}
                <ListItem style={{margin : 0,padding:0}} disablePadding>
                <ListItemButton  style={{margin:0, fontSize:"12px", paddingLeft:25,paddingRight:25  ,borderRadius:24 ,color:"#fff", fontWeight:400, paddingTop:"0px",paddingBottom:0 , backgroundColor:"#4070f4"}} component={Link} to="/user_profile" state={{volunteer}}>
                 <ListItemText primary="Profile" />
                </ListItemButton>
                </ListItem>
         
               <button class="button">Message</button>
            </div>
          
            <div class="analytics">
            <Rating name="read-only" value={2} readOnly />
            </div>
       

        </div>
    </div>




    // <Card style={{ width: '300px', height: '300px', margin:"5px",marginRight:"15px" }}>
    //   <CardHeader
    //     avatar={<div style={{fontSize:"55px"}}><Avatar >{'A'}</Avatar></div>}
    //     title={<div><span style={{marginRight:"2px"}}>{volunteer.firstName}</span><span>{volunteer.lastName}</span></div>}
    //     subheader={volunteer.email}
    //   />
    //   <CardContent>
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       {volunteer.aboutMe}
    //     </Typography>
    //   </CardContent>
    // </Card>
  );
};

export default VolunteerCard;


{/* <ListItem disablePadding>

    </ListItem> */}