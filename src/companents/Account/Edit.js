import React, { Component } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import {
  TextField,
  Button,
  Container,
  Avatar,
  IconButton,
  Grid
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Rasm yuklash ikon
import { DatePicker } from '@mui/lab';
import imageProfile from '../../images/004.webp';
import Autocomplete from '@mui/material/Autocomplete';
import './styleEdit.css'
import { getVolunteerById, updateVolunteer } from '../Volunteer/VolunteerService';
import { useParams, useNavigate } from 'react-router-dom';
import CustomizedMenus from './Setting'
import CircularProgress from '@mui/material/CircularProgress';
import { purple } from '@mui/material/colors';

const accent = purple['ffff'];

const top100Films = [
  { label: 'Eko volontyor' },
  { label: 'Agro volontyor' },
  { label: 'Inkluziv volontyor' },
  { label: 'Favqullotda volontyor ' },
  { label: 'Ta’lim volontyor' },
  { label: 'Ijtimoiy volontyor' },
  { label: 'Sport volontyor ' },
  { label: 'Zoo volontyor ' },
  { label: 'Boshqa ' },
]

const country = [
  { label: 'Uzbekiston' },
  { label: 'Russion ' },
 
]
const howHelp = [
{ label: '⦁	Moddiy' },
{ label: "⦁	Moliyaviy (pul ko'rinishida)"},
{ label: '⦁	Amaliy (shu jumladan tadbirlarda ishtirok etish ham)' },
{ label: '⦁	Konsultativ (masalan: huquqiy va moliyaviy, soliq va b.lar)' },
{label:'⦁	Boshqa'}

]
class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            postArray:[],
            progressBar: "",
            open: false, 
            birthDate: "",
            address:"",
            text: "",
            email:"",
            firstName:"",
            workAndStudent:"",
            city:"",
            phoneNumber:"",
            howHelp:"",
            country:"",
            region:"",
            district:"",
            neighborhood:"",
            chooseTypeVolunteer:"",
            imageProgressBar: 0,
            uploading: false,
            uploadedImage: null,
            inputValue: '',
            countries: [],
            adress: [],
            selectedRegionId: '',
            selectedDistrictsId: '',
            selectedQuarterId: '',
            selectedDistricts: [],
            selectedQuarters:[]
         }
    }

  
    componentDidMount() {
      fetch('https://raw.githubusercontent.com/kenjebaev/regions/master/regions.json')
        .then(response => response.json())
        .then(data => {
          this.setState({ adress: data });
        })
        .catch(error => console.error('Error:', error));
    }
  

    handleRegionChange = (selectedRegionName) => {
      const selectedRegion = this.state.adress.regions.find(region => region.name === selectedRegionName);
    
      if (selectedRegion) {
        const selectedRegionId = selectedRegion.id;
        this.setState({ selectedRegionId });
        
        // Tanlangan region bo'yicha tenglab chiqariladigan districtlarni topish
        const selectedDistricts = this.state.adress.districts.filter(district => district.region_id === Number(selectedRegionId));
        this.setState({ selectedDistricts });
      }
    }
    handleDistrictsChange = (selectedDistrictsName) => {
      const selectedDistrict = this.state.adress.districts.find(district => district.name === selectedDistrictsName);
    
      if (selectedDistrict) {
        const selectedDistrictsId = selectedDistrict.id;
        this.setState({ selectedDistrictsId });
        console.log(selectedDistrictsId);
        
        // Tanlangan region bo'yicha tenglab chiqariladigan districtlarni topish
        const selectedQuarters = this.state.adress.quarters.filter(quarter => quarter.district_id === Number(selectedDistrictsId));
        this.setState({ selectedQuarters });
        console.log(selectedQuarters);
      }
    }
    

  

   handleUpdate = async (id) => {
      await updateVolunteer(id);
    
    };

    handleOpen = () => {
        this.setState({ open: true });
        const name =  this.props.userName.userName
        console.log(name);
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
 
    handleTextChange = (event) => {
        this.setState({ text: event.target.value });
    }
    handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      if (!imageFile) return;
      const reader = new FileReader();
  
      reader.onloadend = () => {
        this.setState({ uploadedImage: reader.result });
      };
  
      reader.readAsDataURL(imageFile);
    };
    // Rasm va boshqa fayllarni yuklash uchun Firebase storage'ni ishlatish funktsiyasi
    uploadImage = (imageFile) => {
    const storage = getStorage();
    const imageStorageRef = ref(storage, imageFile.name);
    const imageUploadTask = uploadBytesResumable(imageStorageRef, imageFile);
  
    return new Promise((resolve, reject) => {
      imageUploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({ imageProgressBar: progress });
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(imageUploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
    };
  

  // Formani yuborish uchun asosiy funktsiya
  handleSubmit = async (event) => {
    event.preventDefault();
    const imageFile = event.target.elements.imageFile.files[0];
    const text = event.target.elements.text.value;
    const firstName = event.target.elements.firstName.value;
    const email = event.target.elements.email.value;
    const chooseTypeVolunteer = event.target.elements.chooseTypeVolunteer.value;
    const howHelp = event.target.elements.howHelp.value;
    const phoneNumber = event.target.elements.phoneNumber.value;
    const birthDate = event.target.elements.birthDate.value;
    const city = event.target.elements.city.value;
    const workAndStudent = event.target.elements.workAndStudent.value;
    const country = event.target.elements.country.value;
    const region = event.target.elements.region.value;
    const district =event.target.elements.district.value;
    const neighborhood = event.target.elements.neighborhood.value;



    // Tekshirish: Hujjatlar va matnni to'ldirish
    if (!imageFile || !text.trim()) {
      console.log("Iltimos, hamma fayllarni tanlang va matnni kiriting.");
      return;
    }
  
    try {
      const imagePath = await this.uploadImage(imageFile);

  
      console.log(imagePath);
      const payload = { 
        firstName: firstName,
        imagePath: imagePath,
        aboutMe: text,
        birthDate:birthDate,
        chooseTypeVolunteer:chooseTypeVolunteer,
        email:email,
        howHelp:howHelp,
        phoneNumber:phoneNumber,
        address:{
           country:country,
           region:region,
           district:district,
           neighborhood:neighborhood,
        },
        place:city,
        workAndStudent:workAndStudent,
        
      };
      // Hujjatni yangilash uchun PUT HTTP so'rovi uchun URL
      const updateUrl = `http://localhost:8080/api/volunteers/${this.props.userAuthData.id}`;
  
      const requestOptions = {
        method: "PUT", // PUT HTTP so'rovini ishlatish
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      };
  
      const response = await fetch(updateUrl, requestOptions);
      if (response.ok) {
        const responseData = await response.text(); // Read the response as text
        console.log({responseData}); // Log the response data
 
        // ...
      } else {
        console.error("Server returned an error:", response.status);
        console.log( (console.error("Server returned an error:", response.status))||(response.status));
        // Handle the error case appropriately
      }
      
  
      // Kiritish maydonlarini va progress barlarni tozalash
         event.target.reset();
      this.setState({ imageProgressBar: 0, otherProgressBar: 0 });
      await updateVolunteer(this.props.userAuthData.id, payload);

      // Redirect to the profile page after successful submission 
      window.location.reload();
      this.props.handleSaveChanges();
      // const navigate = useNavigate();
      // navigate(`/volunteer/${this.props.userAuthData.id}`);
     


    } 
    catch (error) {
      console.error("Xato yuz berdi: Fayllar yuklanishida xato:", error);
    }
  };
      


    
    render() { 
      const { inputValue, countries } = this.state;
      console.log('adress:', this.state.adress);
      console.log(this.state.matchingDistricts);
        // console.log(id);
        return (
          <div className='edit_pages'>
          <form onSubmit={this.handleSubmit}>
          <Container className='container_edit' maxWidth="sm">
            <Avatar
         alt="User Photo"
         src={this.props.userAuthData.imagePath}
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
      
             <input  id="image-upload" style={{ display: 'none' }} type="file" name="imageFile" onChange={this.handleImageChange} />
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
       
         label="Full name"
         type="text" name="firstName" 
         defaultValue={this.props.userAuthData.firstName}
         fullWidth
         margin="normal"
       />
                 </Grid>
                 <Grid item xs={12} md={6} >
                 <TextField
                  name="birthDate"
                  label="Birth date"
                  type='text'
                  defaultValue={this.props.userAuthData.birthDate}
                  fullWidth
                  margin="normal" />
     
                 </Grid>
            </Grid>
      
            <Grid container>
            <Grid style={{marginRight:5}} item xs={12} md={5.8} >
            <TextField
              name="phoneNumber"
              type='texy'
              label="Phone number"
              defaultValue={this.props.userAuthData.phoneNumber}
              fullWidth
              margin="normal"
            />
            </Grid>
            <Grid item xs={12} md={6} >
                 <TextField
                   name="workAndStudent"
                   type='text'
                   label="Student or Worker"
                   defaultValue={this.props.userAuthData.workAndStudent}
                   fullWidth
                   margin="normal"
                 />
            </Grid>
            </Grid>

            <Grid container>

              <Grid style={{marginRight:5}} item xs={12} md={5.8} >
              <TextField
                name="email"
                label="Email"
                defaultValue={this.props.userAuthData.email}
                fullWidth
                margin="normal"
              />
              </Grid>
              <Grid item xs={12} md={6} >
              <TextField
                name="city"
                type='text'
                label="Country,City"
                defaultValue={this.props.userAuthData.place}
                fullWidth
                margin="normal"
              />
              </Grid>
            </Grid>
            
            <Grid container>

              <Grid style={{marginRight:5}} item xs={12} md={5.8} >
                <Autocomplete
                   disablePortal
                   id="combo-box-demo"
                   onChange={(event, value) => this.handleRegionChange(value)}
                   options={country}
                   maxWidth="sm"
                   defaultValue={this.props.userAuthData.address.country}
                   renderInput={(params) => <TextField type='text'  name="country"  {...params} label="Country?"
                   style={{marginBottom:15,marginTop:15}} />}
                 />
              </Grid>
              <Grid item xs={12} md={6} >
                  <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       onChange={(event, value) => this.handleRegionChange(value)}
                       options={this.state.adress.regions ? this.state.adress.regions.map(region => region.name) : []}
                       maxWidth="sm"
                       defaultValue={this.props.userAuthData.address.region}
                       renderInput={(params) => <TextField type='text'  name="region"  {...params} label="Regions?"
                       style={{marginBottom:15,marginTop:15}} />}
                     />
         
              </Grid>
            </Grid>
            <Grid container>

            <Grid style={{marginRight:5}} item xs={12} md={5.8} >
                     <Autocomplete
                       disablePortal
                       id="combo-box-demo"
                       onChange={(event, value) => this.handleDistrictsChange(value)}
                       options={this.state.selectedDistricts ? this.state.selectedDistricts.map(selectedDistrict => selectedDistrict.name) : []}
                       maxWidth="sm"
                       defaultValue={this.props.userAuthData.address.district}
                       renderInput={(params) => <TextField type='text'  name="district"  {...params} label="Districts?"
                       style={{marginBottom:15,marginTop:15}} />}
                     />
            </Grid>
            <Grid item xs={12} md={6} >
                   <Autocomplete
                     disablePortal
                     id="combo-box-demo"
                     options={this.state.selectedQuarters ? this.state.selectedQuarters.map(selectedQuarter => selectedQuarter.name) : []}
                     maxWidth="sm"
                     defaultValue={this.props.userAuthData.address.neighborhood}
                     renderInput={(params) => <TextField type='text'  name="neighborhood"  {...params} label=" Quarters?"
                     style={{marginBottom:15,marginTop:15}} />}
                   />
            
            </Grid>
            </Grid>

            <TextField
              name="text"
              label='Bio'
              defaultValue={this.props.userAuthData.aboutMe}
              fullWidth
              margin="normal"
            />
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            maxWidth="sm"
            defaultValue={this.props.userAuthData.chooseTypeVolunteer}
            renderInput={(params) => <TextField type='text'  name="chooseTypeVolunteer"  {...params} label="Qaysi yo’nalishlarda volontyor bo’lmoqchisiz?"
            style={{marginBottom:15,marginTop:15}} />}
          />
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={howHelp}
            maxWidth="sm"
            type='text'
            defaultValue={this.props.userAuthData.howHelp}
            renderInput={(params) => <TextField   name="howHelp" {...params} label="Qanday yordam ko'rsatmoqchisiz?" />}
          />
            
          <DatePicker
              label="Birth Date"
              value={new Date('2001-12-12')}
          
              renderInput={(params) => <TextField {...params} />}
              fullWidth
              margin="normal"
            />
    
  

           </Container>  
           <div className="uploadButton">
        <Button  variant="outlined" style={{marginLeft:400 , marginTop:20}} type="submit"  endIcon={ <CircularProgress color="primary" size={24} variant="determinate" value={this.state.imageProgressBar}/>} >
       Uplode
       {/* {(this.state.imageProgressBar==0)? <CircularProgress size={24} /> : 'Log In'} */}
        </Button>
     
      </div>
          </form>
         </div> 
      // <div>namew</div>
  



 
         );
    }
}
 
export default EditUser;