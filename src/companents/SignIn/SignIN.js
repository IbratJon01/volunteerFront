import React, { Component } from 'react';
import { TextField, Button, CircularProgress, InputAdornment, IconButton,Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

class SignIN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: "",
            password: "",
            loading: false,
            showPassword: false,
            error: null
        }
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    }

    login = () => {
        this.setState({ loading: true, error: null }); // Yuklanish boshlandi
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.state.emailId, this.state.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("users", JSON.stringify(user));
                this.setState({ loading: false }); // Yuklanish tugallandi
                window.location.reload();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode || errorMessage);
                this.setState({ loading: false, error: errorMessage }); // Yuklanish xatolandi
            });
    }

    render() {
        return (
            <div>
                {/* Email input */}
                <TextField
                    className="logipage__text"
                    onChange={(event) => { this.setState({ emailId: event.target.value }) }}
                    label="Email"
                    variant="outlined"
                    size="small"
                    error={this.state.error && this.state.error.includes('email')}
                    helperText={this.state.error && this.state.error.includes('email') ? this.state.error : ''}
                />

                {/* Password input */}
                <TextField
                    className="logipage__text"
                    onChange={(event) => { this.setState({ password: event.target.value }) }}
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Password"
                    variant="outlined"
                    size="small"
                    error={this.state.error && this.state.error.includes('password')}
                    helperText={this.state.error && this.state.error.includes('password') ? this.state.error : ''}
                  
                />
                      {this.state.error && !this.state.error.includes('email') && !this.state.error.includes('password') && (
                    <Alert severity="error">{this.state.error}</Alert>
                )}
                {/* Log In button and loading indicator */}
                <Button
                    className="login__button"
                    onClick={this.login}
                    variant="contained"
                    color="primary"
                >
                  {this.state.loading ? <CircularProgress size={24} /> : 'Log In'}
                </Button>

               
            </div>
        );
    }
}

export default SignIN;





// import React, { Component } from 'react';
// import { TextField, Button, CircularProgress } from '@mui/material';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import '../LoginPage/LoginPage.css';

// class SignIN extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             emailId: '',
//             password: '',
//             loading: false,
//         };
//     }

//     login = () => {
//         this.setState({ loading: true }); // Yuklanish boshlandi
//         const auth = getAuth();
//         signInWithEmailAndPassword(auth, this.state.emailId, this.state.password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 localStorage.setItem('users', JSON.stringify(user));
//                 this.setState({ loading: false }); // Yuklanish tugallandi
//                 window.location.reload();
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode || errorMessage);
//                 this.setState({ loading: false }); // Yuklanish xatolandi
//             });
//     };

//     render() {
//         return (
//             <div>
//                 <TextField
//                     className="logipage__text"
//                     label="Email"
//                     variant="outlined"
//                     onChange={(event) => {
//                         this.setState({ emailId: event.currentTarget.value });
//                     }}
//                 />
//                 <TextField
//                     className="logipage__text"
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     onChange={(event) => {
//                         this.setState({ password: event.currentTarget.value });
//                     }}
//                 />
                
//                 <Button className="login__button" variant="contained" onClick={this.login}>
//                     {this.state.loading ? <CircularProgress size={24} /> : 'Log In'}
//                 </Button>
//             </div>
//         );
//     }
// }

// export default SignIN;
