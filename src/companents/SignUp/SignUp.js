import React, { Component } from 'react';
import "./SignUp.css";
import {storage,auth} from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Button, CircularProgress, InputAdornment, IconButton,Alert } from '@mui/material';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailId : null,
            name: null,
            userName: null,
            password: null,
            showPassword: false,
            loading: false,
         }
    }
    newSignUp=()=>{
      this.setState({ loading: true, error: null }); // Yuklanish boshlandi
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,  this.state.emailId,  this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        let payload = {
          "volunteerId": user.uid,
          "firstName": this.state.userName,
          "lastName": this.state.name,
          "email":this.state.emailId
      }
      const requestOptions ={
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(payload),
    }
      fetch("http://localhost:8080/api/volunteers",requestOptions)
      
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("users",JSON.stringify(user));
                window.location.reload();
            })
            .catch(error =>{
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode || errorMessage);
              this.setState({ loading: false, error: errorMessage }); // Yuklanish xatolandi

            })
        // ...
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode||errorMessage);
        this.setState({ loading: false, error: errorMessage }); // Yuklanish xatolandi
        // ..
      });
        

    }
    togglePasswordVisibility = () => {
      this.setState((prevState) => ({
          showPassword: !prevState.showPassword
      }));
  }

    render() { 
        return ( 
            <div>
                   <TextField
                    className="logipage__text"
                    onChange={(event)=>{this.state.emailId=event.currentTarget.value;}}
                    label="Email"
                    variant="outlined"
                    size="small"
                    error={this.state.error && this.state.error.includes('email')}
                 
                />
               <TextField
                    className="logipage__text"
                    onChange={(event)=>{this.state.name=event.currentTarget.value;}}
                    label="First name"
                    variant="outlined"
                    size="small"
                />
                <TextField
                    className="logipage__text"
                    onChange={(event)=>{this.state.userName=event.currentTarget.value;}}
                    label="Last name"
                    variant="outlined"
                    size="small"
                />
                 <TextField
                  className="logipage__text"
                    onChange={(event) => { this.setState({ password: event.target.value }) }}
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Password"
                    variant="outlined"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={this.togglePasswordVisibility}>
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                  }}
                />
               
                <Button
                    className="login__button"
                    onClick={this.newSignUp}
                    variant="contained"
                    color="primary"
                >
                  {this.state.loading ? <CircularProgress size={24} /> : 'Log In'}
                </Button>
            </div>
         );
    }
}
 
export default SignUp;