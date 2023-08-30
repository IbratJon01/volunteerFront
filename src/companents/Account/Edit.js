import TextField from '@mui/material/TextField';
import React, { Component } from 'react';
import "./MainPage.css";
import uploadImage from "../../images/upload.png";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import LinearProgress from '@mui/material/LinearProgress';
import PostUser from "../Post/PostUser"
// import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemText } from '@material-ui/core';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import Input from '@mui/material/Input';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';





const ariaLabel = { 'aria-label': 'description' };
const iconStyle = {  display: 'flex', alignItems: 'center', justifyContent: 'center'  };
const iconSize ={ fontSize: 50}

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            postArray:[],
            progressBar: "",
            open: false, 
            userName: "",
            text: "",
            name:"",
            imageProgressBar: 0,
            uploading: false,
            uploadedImage: null,
            inputValue: '',
            countries: []
         }
    }
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
    const userName = event.target.elements.userName.value;
    const name = event.target.elements.name.value;
    // Tekshirish: Hujjatlar va matnni to'ldirish
    if (!imageFile || !text.trim()) {
      console.log("Iltimos, hamma fayllarni tanlang va matnni kiriting.");
      return;
    }
  
    try {
      const imagePath = await this.uploadImage(imageFile);
      const db = getFirestore();
      const postsRef = collection(db, "posts");
      
      const now = new Date();
      const payload = {
        profileImage: imagePath,
        bio: text,
        userName: userName,
        name:name,

      
   
      };
      // Hujjatni yangilash uchun PUT HTTP so'rovi uchun URL
      const updateUrl = `http://localhost:8080/users/${this.props.userAuthData.userAuthData.userId}`;
  
      const requestOptions = {
        method: "PUT", // PUT HTTP so'rovini ishlatish
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      };
  
      const response = await fetch(updateUrl, requestOptions);
      if (response.ok) {
        const responseData = await response.text(); // Read the response as text
        console.log("Response Data:", responseData); // Log the response data
 
        // ...
      } else {
        console.error("Server returned an error:", response.status);
        // Handle the error case appropriately
      }
  
      // Kiritish maydonlarini va progress barlarni tozalash
      event.target.reset();
      this.setState({ imageProgressBar: 0, otherProgressBar: 0 });
    } catch (error) {
      console.error("Xato yuz berdi: Fayllar yuklanishida xato:", error);
    }
  };
      componentDidMount() {
        axios.get('https://restcountries.com/v2/all').then((response) => {
          const countriesWithFlags = response.data.map((country) => ({
            name: country.name,
            flag: country.flags.svg
          }));
    
          this.setState({
            countries: countriesWithFlags
          });
        });
      }
    
      handleInputChange = (event, newValue) => {
        this.setState({
          inputValue: newValue
        });
      };
    
    render() { 
      const { inputValue, countries } = this.state;
        console.log(this.props.userAuthData);
        return ( 
            <div>
          <form onSubmit={this.handleSubmit}>
            <Card sx={{ marginTop: 5 }}>
                <CardContent>
                    <Grid container spacing={2}> 
                    
                    <Grid xs={6} md={6}>
                <Avatar   src={this.props.userAuthData.userAuthData.profileImage}
                 sx={{ width: 100, height: 100}} aria-label="recipe">
                 </Avatar>
             
                    </Grid>
                    
                    <Grid xs={6} md={6}>
                <div style={{fontSize:"18px" }}>
                <TextField
                  type="text" name="name" 
                 id="outlined-uncontrolled"
                 label="Full Name"
                 defaultValue={this.props.userAuthData.userAuthData.name}
               />
                  </div> <br/>
                  <TextField
                    id="outlined-uncontrolled"
                    type="text" name="userName" 
                    label="User Name "
                    defaultValue={this.props.userAuthData.userAuthData.userName}
                  />
                    </Grid>
                    </Grid>


           </CardContent>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
         <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          type="text" name="text" 
          maxRows={4}
          variant="standard"
          style={ {width: '350px'} }
          defaultValue={this.props.userAuthData.userAuthData.bio}
 
        />
        {/* <input type="text" name="location"  placeholder="Enter text..." /> */}
        </Typography>
      </CardContent>
            <input type="file" name="imageFile" onChange={this.handleImageChange} />
          <progress value={this.state.imageProgressBar} max="100" />
  <div className="uploadButton">
          <Button type="submit" variant="contained" endIcon={<DownloadForOfflineIcon />}>Upload</Button>
        </div>
    </Card>
     </form>
          </div>
         );
    }
}
 
export default MainPage;