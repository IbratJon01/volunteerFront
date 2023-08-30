import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardMedia,
  Avatar,
  IconButton,
  Grid
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Rasm yuklash ikon
import { DatePicker } from '@mui/lab';
import imageProfile from '../../images/004.webp';
import Autocomplete from '@mui/material/Autocomplete';
import './styleEdit.css'

const UserProfileEdit = ({ user, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);
    const [editingImage, setEditingImage] = useState(false);
    const top100Films = [
        { label: '⦁	Eko volontyor' },
        { label: '⦁ Agro volontyor' },
        { label: '⦁	Inkluziv volontyor' },
        { label: '⦁	Favqullotda volontyor ' },
        { label: '⦁ Ta’lim volontyor' },
        { label: '⦁ Ijtimoiy volontyor' },
        { label: '⦁	Sport volontyor ' },
        { label: '⦁	Zoo volontyor ' },
        { label: '⦁	Boshqa ' },
    ]
    const howHelp = [
      { label: '⦁	Moddiy' },
      { label: "⦁	Moliyaviy (pul ko'rinishida)"},
      { label: '⦁	Amaliy (shu jumladan tadbirlarda ishtirok etish ham)' },
      { label: '⦁	Konsultativ (masalan: huquqiy va moliyaviy, soliq va b.lar)' },
      {label:'⦁	Boshqa'}

  ]
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setEditedUser((prevUser) => ({
              ...prevUser,
              photoPath: event.target.result,
            }));
          };
          reader.readAsDataURL(file);
        }
      };
  
    const handleSaveClick = () => {
      onSave(editedUser);
    };

  return (
    <div className='edit_pages'>
         <Container className='container_edit' maxWidth="sm">
           <Avatar
        alt="User Photo"
        src={imageProfile}
        sx={{ width: 170, height: 170, marginTop:3 }}
      ><label htmlFor="image-upload">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"

      >
        <PhotoCameraIcon />
      </IconButton>
         </label> </Avatar>
           <input
             accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
             onChange={handleImageUpload}
           />
           <label htmlFor="image-upload">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          style={{marginTop:"-40px"}}
        >
          <PhotoCameraIcon />
        </IconButton>
           </label>
           <Grid container>
                <Grid style={{marginRight:5}} item xs={12} md={5.8} >
                    <TextField
        name="Full name"
        label="Full name"
        value= ' Asadov Ibrat'   //{editedUser.firstName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
                </Grid>
                <Grid item xs={12} md={6} >
                <TextField
        name="lastName"
        label="Birth date"
        value="2001.12.12"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
    
                </Grid>
           </Grid>
     
           <Grid container>
           <Grid style={{marginRight:5}} item xs={12} md={5.8} >
      <TextField
        name="lastName"
        label="Phone number"
        value="998900343846"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
           </Grid>
           <Grid item xs={12} md={6} >
      <TextField
        name="lastName"
        label="Student or Worker"
        value="Student"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
           </Grid>
           </Grid>
           <Grid container>
      <Grid style={{marginRight:5}} item xs={12} md={5.8} >
      <TextField
        name="lastName"
        label="Email"
        value="Email"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      </Grid>
      <Grid item xs={12} md={6} >
      <TextField
        name="lastName"
        label="Country,City"
        value="Country"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      </Grid>
           </Grid>
           <TextField
             name="lastName"
        label={'About me '}
        value="Social Worker, Speaker, Volunteer, Motivator, Speaker, Mentor.
          Founder of the Golden Wing volunteer team;
          President of the Young Volunteers Academy;
          Master's degree from the National University of Uzbekistan;
          Founder and Speaker of the School of Motivators."
        onChange={handleInputChange}
        fullWidth
        margin="normal"
           />
           <Autocomplete
           disablePortal
      id="combo-box-demo"
      options={top100Films}
      maxWidth="sm"
      renderInput={(params) => <TextField {...params} label="Qaysi yo’nalishlarda volontyor bo’lmoqchisiz?
      "
           style={{marginBottom:15,marginTop:15}} />}
         />
           <Autocomplete
           disablePortal
      id="combo-box-demo"
      options={howHelp}
      maxWidth="sm"
           renderInput={(params) => <TextField {...params} label="Qanday yordam ko'rsatmoqchisiz?" />}
         />
        
        
           
           
         <DatePicker
             label="Birth Date"
             value={new Date('2001-12-12')}
             onChange={(newDate) => {
               setEditedUser((prevUser) => ({
                 ...prevUser,
                 birthDate: newDate,
               }));
             }}
             renderInput={(params) => <TextField {...params} />}
             fullWidth
             margin="normal"
           />
   
   
       
     
    
      
      {/* Add more fields here for other user attributes */}

      <Button variant="contained" color="primary" onClick={handleSaveClick}>
        Save
      </Button>
          </Container>

    </div>
 
  );
};

export default UserProfileEdit;
