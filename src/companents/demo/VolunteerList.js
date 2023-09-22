import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllVolunteers } from '../Volunteer/VolunteerService';
import imageProfile from '../../images/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg';
import '../Card/style.css';
import Rating from '@mui/material/Rating';
import {List, Card, CardHeader, CardContent, Avatar, Typography , ListItem,ListItemButton,ListItemText } from '@mui/material';


const VolunteerList = ({users}) => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    getAllVolunteers().then((response) => {
      setVolunteers(response.data);
    });
  }, []);

  console.log(users);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
 
        {(users.length > 0 ? users : volunteers).map((volunteer) => (


       
             <div className='body1' >
           <div class="profile-card_bir" >
            <div class="image">
                <img src={(volunteer.imagePath==null)?imageProfile:volunteer.imagePath} alt="" class="profile-img"/>
            </div>
            <div class="text-data">
                <span class="name">{volunteer.firstName} {volunteer.lastName}</span>
                <span class="job">{volunteer.chooseTypeVolunteer}</span>
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
                <ListItemButton to={`/volunteer/${volunteer.id}`}  style={{margin:0, fontSize:"12px", paddingLeft:25,paddingRight:25  ,borderRadius:24 ,color:"#fff", fontWeight:400, paddingTop:"0px",paddingBottom:0 , backgroundColor:"#4070f4"}} component={Link} >
                 <ListItemText primary="Profile" />
                </ListItemButton>
                </ListItem>
         
               <button class="button">Message</button>
            </div>
          
            <div class="analytics">
            <Rating
                  name={`score-${volunteer.id}`}
                  value={volunteer.score}
                  readOnly
                />
            </div>
       

        </div>
   
    </div>
            // <Link to={`/volunteer/${volunteer.id}`}>
            //   {volunteer.firstName}
            // </Link>
      
        ))}
    
    </div>
  );
};

export default VolunteerList;
