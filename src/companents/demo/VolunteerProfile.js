import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVolunteerById } from '../Volunteer/VolunteerService';
import Rating from '@mui/material/Rating';
import { Container, Grid, Card, CardContent, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import { Room } from '@mui/icons-material';
import Setting from '../Account/Setting'

const VolunteerProfile = (props) => {
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState({});

  useEffect(() => {
    getVolunteerById(id).then((response) => {
      setVolunteer(response.data);
    });
  }, [id]);
  const score = volunteer.score
  console.log(score);

  return (


    <Container className="container">
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
        <Card className="card userProfile">
          <CardContent>
            <Avatar src={volunteer.imagePath} alt={volunteer.firstName} className="profile" sx={{ width: 180, height: 180 }} />
          </CardContent>
        </Card>
        <Card style={{padding:3}} className="work_skills card">   
      
          <div className="work">
              <h6 className="heading">Work or Student</h6>
              <div className="primary">
                  <h6>{volunteer.place}</h6>
                  <span>Primary</span>
                  <p>{volunteer.workAndStudent}</p>
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
                     <span>{volunteer.language}</span>
                   </div>
                </li>
                <li>  
                  <div className='contact_page'>
                     <br/>
                     <span className='page_name'>
              <PhoneIcon className='icons' /> Volunteer:
                     </span>
                     <span>{volunteer.howHelp}</span>
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
              <Typography variant="h5" className="name">{volunteer.firstName} {volunteer.lastName}</Typography>
              <div className="map">
                <Room className="ri" />  <span>{volunteer.place}</span>
   
        
           <Grid  sx={{  display: { xs: "none", sm: "block"}}} item ><div className='bush'></div> </Grid>
           <div className='settings'>  {props.userId == volunteer.volunteerId ? (<Setting userAuthData={volunteer}  />) : ( '')}</div> 
               
              </div>
       
              <p>{volunteer.chooseTypeVolunteer}</p>
            </div>
             <Rating name="read-only" value={volunteer?.score || 0} readOnly />
      
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
             <span>{volunteer.phoneNumber}</span>
          </div> 
          <div className='contact_page'>
          <br/>
          <span className='page_name'>
              <LocationOnIcon className='icons' /> Address:
          </span>
              <span> {volunteer.place}</span>
          </div>
          <div className='contact_page'>
          <br/>
          <span className='page_name'>
              <EmailIcon className='icons' /> E-mail:
          </span>
             <span>{volunteer.email}</span>
          </div>
          <div className='contact_page'>
              <br/>
              <EventIcon className='icons' /> {/* Tug'ilgan kun ikoni */}
              <span className='page_name'>Birthday:</span> <span>{volunteer.birthDate}</span>
          </div>  
         

       

         
          </CardContent>
        </Card>
      </Grid>
      {/* Add more Grid items for other sections */}
    </Grid>
  
  </Container>

    // <div>

        
    //   <h1>Volunteer Profili</h1>
    //   <p>First Name: {volunteer.firstName}</p>
    //   <p>Image: {volunteer.imagePath}</p>
    //   <p>Birth Date: {volunteer.birthDate}</p>
    //   <Link to={`/volunteer/${id}/edit`}>Edit</Link>
    // </div>
  );
};

export default VolunteerProfile;
