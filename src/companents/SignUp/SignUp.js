import React, { Component } from 'react';
import "./SignUp.css";
import {storage,auth} from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailId : null,
            name: null,
            userName: null,
            password: null
         }
    }
    newSignUp=()=>{

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

            })
        // ...
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
        

    }

    render() { 
        return ( 
            <div>
                <input className="logipage__text" onChange={(event)=>{this.state.emailId=event.currentTarget.value;}}  type="text" placeholder="Mobile number or Email" />
                <input className="logipage__text" onChange={(event)=>{this.state.name=event.currentTarget.value;}} type="text" placeholder="Full Name" />
                <input className="logipage__text" onChange={(event)=>{this.state.userName=event.currentTarget.value;}} type="text" placeholder="Username" />
                <input className="logipage__text" onChange={(event)=>{this.state.password=event.currentTarget.value;}} type="password" placeholder="Password" />
                <button className="login__button" onClick={this.newSignUp} >Sign up</button>
            </div>
         );
    }
}
 
export default SignUp;