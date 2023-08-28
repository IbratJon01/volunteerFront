import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';
import imageProfile from '../../images/004.webp'
import './style.css'
const VolunteerCard = ({ volunteer }) => {
  return (
    <div className='body'>
        <div class="profile-card" >
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
                <button class="button">Subscribe</button>
                <button class="button">Message</button>
            </div>
          
            <div class="analytics">
                <div class="data">
                    <i class="bx bx-heart"></i>
                    <span class="number">60k</span>
                </div>
                <div class="data">
                    <i class="bx bx-message-rounder"></i>
                    <span class="number">20k</span>
                </div>
                <div class="data">
                    <i class="bx bx-share"></i>
                    <span class="number">12k</span>
                </div>
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
