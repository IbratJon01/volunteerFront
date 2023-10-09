import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Room } from '@mui/icons-material';
import './style.css'; // style.css stilini o'rnating
import Rating from '@mui/material/Rating';
import pf from "../../images/004.webp"
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import { useLocation } from 'react-router-dom';
import Setting from './Setting'
import { getVolunteerById, deleteVolunteer } from '../Volunteer/VolunteerService';
import CircularProgress from '@mui/material/CircularProgress';
function Profile(props) {

  const location = useLocation();
  const id = location.state?.id;
  console.log(id);

  const [userId, setId] = useState(id);
  const [volunteers, setVolunteer] = useState(null);
  useEffect(() => {
    if (id) {
      // Only fetch data if 'id' is available
      getVolunteerById(id)
        .then((response) => {
          setVolunteer(response.data);
        })
        .catch((error) => {
          console.error('Error fetching volunteer data:', error);
        });
    }
  }, [id]);

   console.log(volunteers);

   if (volunteers === null) {
    return   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>;
  }
  return (
    <Container className="container">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Card className="card userProfile">
            <CardContent>
              <Avatar src={volunteers.imagePath} alt={volunteers.firstName} className="profile" sx={{ width: 180, height: 180 }} />
            </CardContent>
          </Card>
          <Card style={{padding:3}} className="work_skills card">   
        
            <div className="work">
                <h6 className="heading">Work or Student</h6>
                <div className="primary">
                    <h6>{volunteers.place}</h6>
                    <span>Primary</span>
                    <p>{volunteers.workAndStudent}</p>
                </div>
            </div>

     
            <div className="skills">
                <h6 className="heading">Skills</h6>
                <ul>
                 
                  <li>  
                    <div className='contact_page'>
                       <br/>
                       <span className='page_name'>
                <PhoneIcon className='icons' /> Language:
                       </span>
                       <span>{volunteers.language}</span>
                     </div>
                  </li>
                  <li>  
                    <div className='contact_page'>
                       <br/>
                       <span className='page_name'>
                <PhoneIcon className='icons' /> Volunteer:
                       </span>
                       <span>{volunteers.howHelp}</span>
                     </div>
                  </li>
          
                </ul>
            </div>
          
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <Card className="card userDetails">
            <CardContent>
              <div className="userName">
                <Typography variant="h5" className="name">{volunteers.firstName} {volunteers.lastName}</Typography>
                <div className="map">
                  <Room className="ri" />  <span>{volunteers.address.country}</span>   
          
             <Grid  sx={{  display: { xs: "none", sm: "block"}}} item ><div className='bush'></div> </Grid>
             <div className='settings'>  {props.userId == volunteers.volunteerId ? (<Setting userAuthData={volunteers}  />) : ( '')}</div> 
                 
                </div>
         
                <p>{volunteers.chooseTypeVolunteer}</p>
              </div>
               <Rating name="read-only" value={2} readOnly />
        
              <div className="btns">
              <Grid container spacing={2}>
        
                <Grid item xs={6}></Grid>
              </Grid>
           
              </div>
            </CardContent>
          </Card>
          <Card style={{padding:0}} className="card timeline_about">
            <CardContent>
            <div class="tabs">
                <ul>
                    <li class="timeline">
                        <i class="ri-eye-fill ri"></i>
                        <span>Timeline</span>
                    </li>

                    <li class="about active">
                        <i class="ri-user-3-fill ri"></i>
                        <span>About</span>
                    </li>
                </ul>
            </div>
            <div className='contact_page'>
           
                <br/>
                <span className='page_name'>Contact Information</span>
            </div>
            <div className='contact_page'>
            <br/>
            <span className='page_name'>
                <PhoneIcon className='icons' /> Phone:
            </span>
               <span>{volunteers.phoneNumber}</span>
            </div> 
            <div className='contact_page'>
            <br/>
            <span className='page_name'>
                <LocationOnIcon className='icons' /> Address:
            </span>
                <span> {volunteers.place}</span>
            </div>
            <div className='contact_page'>
            <br/>
            <span className='page_name'>
                <EmailIcon className='icons' /> E-mail:
            </span>
               <span>{volunteers.email}</span>
            </div>
            <div className='contact_page'>
                <br/>
                <EventIcon className='icons' /> {/* Tug'ilgan kun ikoni */}
                <span className='page_name'>Birthday:</span> <span>{volunteers.birthDate}</span>
            </div>  
           

         

           
            </CardContent>
          </Card>
        </Grid>
        {/* Add more Grid items for other sections */}
      </Grid>
    
    </Container>

 
    );
}

export default Profile;



