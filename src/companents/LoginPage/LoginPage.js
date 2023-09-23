import React, { Component } from 'react';
import './LoginPage.css'
import { Button, Grid } from '@mui/material';
import inst_image from '../../images/1846d0d558fac7cbe21144351f7877ef.png';
import insta_logo from '../../images/logoinsta.png';
import fb from '../../images/fb.png'
import google from '../../images/icons8-google-96.svg'
import appstore from '../../images/app.png'
import playstore from '../../images/play.png'
import SignIN from '../SignIn/SignIN';
import SignUp from '../SignUp/SignUp';
import { auth } from '../firebase';
import { GoogleAuthProvider , signInWithPopup } from 'firebase/auth';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isLogin:true,
            emailId : null,
            name: null,
            userName: null,
            password: null,
        }
    }

    handelGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
          
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            let payload = {
                "volunteerId": user.uid,
                "firstName": user.displayName,
                "lastName": '',
                "email":user.email,
             

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
            localStorage.setItem("users",JSON.stringify(user));
         
            window.location.href = '/';
            console.log("Kirish muvaffaqiyatli amalga oshirildi", result.user);
        } catch (error) {
            console.error("Kirishda xatolik yuz berdi", error);
        }
    }


    changeLogin=()=>{

  
        if(this.state.isLogin)
            this.setState({isLogin: false});
        else    
            this.setState({isLogin: true});
        
    }
    render() { 
        return (
             <div>
               <Grid container>
                <Grid item xs={3}  ></Grid>
                <Grid item xs={6}>
                    <div className="loginpage__main">
                        <Grid container>
                             <Grid  sx={{  display: { xs: "none", sm: "block"}}} item md={5}>
                                <div className='login_desgin'><img src={inst_image} className='loginImage'  /></div>
                                </Grid>
                             <Grid  sx={{  display: { xs: "none", sm: "block"}}} item md={2}></Grid>
                             <Grid item xs={12} md={5}>     
                             <div>
                               <div className="loginpage_rightcomponent">
                                <div className='logo_name'>Volunteers</div>
                                   {/* <img className="loginpage__logo" src={insta_logo} /> */}
                                   <div className="loginPage__signin">

                                     {
                                         this.state.isLogin ? <SignIN/> : <SignUp/>
                                     }

                                        <div className="login__ordiv">
                                            <div className="login__dividor"></div>
                                            <div className="login__or">OR</div>
                                            <div className="login__dividor"></div>
                                        </div>

                                        <div className="login__fb">
                                      
                                            <Button variant="text" startIcon={<img src={google} width="18px" style={{ "marginRight":"5px" }} />}
                                            onClick={this.handelGoogle}><span style={{fontSize:15}}> Log in with Google</span></Button>
                                           
                                        </div>
                                        <div className="login_forgt"> Forgot password?</div>
                                   </div>
                               </div>

                                <div className="loginpage__signupoption">
                                    {
                                        this.state.isLogin ?
                                        <div className="loginPage__signin">
                                                 Don't have an account? <span onClick={this.changeLogin} style={{ "fontWeight":"bold", "color":"#0395F6"}}>Sign up</span>
                                        </div> :
                                        <div className="loginPage__signup">
                                                Have an account? <span onClick={this.changeLogin }  style={{ "fontWeight":"bold", "color":"#0395F6"}}>Sign in</span>
                                        </div>
                                    }
                                    
                                   
                                </div>

                           

                        </div></Grid>
                        </Grid>
                
                   
                       </div>            
                </Grid>
                <Grid item xs={3} ></Grid>
               </Grid>
           </div>  );
    }
}
 
export default LoginPage ;