import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Room, Chat, CheckCircle, Report, Phone, Email, Language, Cake, Male, Timeline, Person } from '@mui/icons-material';
import './style.css'; // style.css stilini o'rnating
import Rating from '@mui/material/Rating';
import pf from "../../images/004.webp"

function Profile() {
  return (
    <Container className="container">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Card className="card userProfile">
            <CardContent>
              <Avatar src={pf} alt="profile" className="profilePicture" sx={{ width: 200, height: 200 }} />
            </CardContent>
          </Card>
          <Card style={{padding:3}} className="work_skills card">   
        
            <div className="work">
                <h6 className="heading">Work or Student</h6>
                <div className="primary">
                    <h6>Spotify New York</h6>
                    <span>Primary</span>
                    <p>170 William Street  New York, NY 10038-212-315-51</p>
                </div>

                <div className="secondary">
                    <h6>Metropolitan Museum</h6>
                    <span>Secondary</span>
                    <p>S34 E 65th Street New York, NY 10651-78 156-187-60 </p>
                </div>
            </div>

     
            <div className="skills">
                <h6 className="heading">Skills</h6>
                <ul>
          
                </ul>
            </div>
          
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
          <Card className="card userDetails">
            <CardContent>
              <div className="userName">
                <Typography variant="h5" className="name">Jeremy Rose</Typography>
                <div className="map">
                  <Room className="ri" />
                  <span>New York, NY</span>
                </div>
                <p>Product Designer</p>
              </div>
               <Rating name="read-only" value={2} readOnly />
        
              <div className="btns">
           
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
        
                <span className='page_name'>Phone:</span> <span>+998900343846</span>
            </div> 
            <div className='contact_page'>
            <br/>
                <span className='page_name'>Address:</span> <span>Uzbekstan , Tashkent ,Olmazor city</span>
            </div>
            <div className='contact_page'>
            <br/>
                <span className='page_name'>E-mail:</span> <span>hello@rsmarquetech.com</span>
            </div>   
            <div className='contact_page'>
            <br/>
              <span className='page_name'>Birthday:</span> <span>07-12-2001</span>
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
