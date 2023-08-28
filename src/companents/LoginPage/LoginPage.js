import React, { Component } from 'react';
import './LoginPage.css'
import { Button, Grid } from '@mui/material';
import inst_image from '../../images/9364675fb26a.svg';
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
            isLogin:true
        }
    }

    handelGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
          
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem("users",JSON.stringify(user));
            window.location.reload();
            console.log("Kirish muvaffaqiyatli amalga oshirildi", result.user);
        } catch (error) {
            console.error("Kirishda xatolik yuz berdi", error);
        }
    }

//45 daqiqa
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
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <div className="loginpage__main">
                        <div>
                               <img src={inst_image} width="454px" />
                        </div>
                        <div>
                               <div className="loginpage_rightcomponent">
                                   <img className="loginpage__logo" src={insta_logo} />
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

                                <div className="loginPage__downloadSection">
                                    <div>
                                    Get the app.
                                    </div>
                                    <div className="loginPage__option">
                                        <img className="loginPage_dwimg" src={appstore} width="136px" />
                                        <img className="loginPage_dwimg" src={playstore} width="136px" />
                                    </div>
                                </div>

                        </div>
                       </div>            
                </Grid>
                <Grid item xs={3}></Grid>
               </Grid>
           </div>  );
    }
}
 
export default LoginPage ;