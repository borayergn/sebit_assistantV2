import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, deepOrange, purple } from '@mui/material/colors';
import axios from 'axios'
import { instanceOf } from 'prop-types';
import {Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ButtonAppBar from '../utilComponents/TopBar'
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie'
import jwt from'jwt-decode'
import Snackbar from '@mui/material/Snackbar';
import Config from '../url_config.json'
import Home from './Home';
import { CookieSharp } from '@mui/icons-material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sebit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const getTokens = (username_password) => {
  return axios.post(Config.Authentication.AUTH_TOKENS_URL+"/",username_password)
}

export default function ForgotPassword() {

  const [isLoginFail,setIsLoginFail] = React.useState(false)
  const [isLoggedIn,setIsLoggedIn] = React.useState(false)
  const [sessionTokens,setSessionTokens] = React.useState({})
  const [isSnackBarActive, setIsSnackBarActive] = React.useState(false)
  const [snackBarMessage,setSnackBarMessage] = React.useState("")
  const [isEmailExists, setIsEmailExists] = React.useState(false)
  const navigate = useNavigate()

  const checkMail = (mailToCheck) => {
    //backendde kontrol et
    axios.get(Config.Endpoints.USERS_URL).then((response) => {
      let users = response.data
      for (let index = 0; index < users.length; index++) {
        const user = users[index];

        console.log("mail to check:",mailToCheck)
        console.log("for:",user["email"])
        if(mailToCheck === user["email"]){
            setIsEmailExists(true)
            resetMail(mailToCheck)
            break
        }
        if ((index === users.length-1) && (mailToCheck !== user["email"])){
          setSnackBarMessage("Invalid e-mail")
        }
      }
      setIsSnackBarActive(true)
    }).catch((error) => {
      console.log(error)
    })
  }
  //logged in userın erişimini kısıtla
  const resetMail = (mail) => {
      setIsSnackBarActive(false)
      if(isEmailExists){
        console.log("attim")
        axios.post(Config.Authentication.FORGOT_PASSWORD_URL,{"email":mail}).then((response) => {
          console.log(response.data)
        
          if (response.status === 200){  
            setSnackBarMessage("E-mail has been sent. Check your mailbox")
            setIsSnackBarActive(true)
          }
          else{     
            setSnackBarMessage("Something went wrong")
            setIsSnackBarActive(true)
          }
          
        }).catch((error)=>{
          console.log(error)
        })

      }
      
  }

  async function handleSubmit(event){

    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    let infos = {
      email: data.get('email'),
    }
    await checkMail(infos["email"])
    
  };

  return (
    <Container maxWidth = {false}>
      <ButtonAppBar />

     
        <CssBaseline />
        <Snackbar
          open={isSnackBarActive}
          onClose={() => setIsSnackBarActive(false)}
          autoHideDuration={5000}
          message={snackBarMessage}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }} />
        <Box
          sx={{
            marginTop: 13,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5" sx = {{my : 3}}>
              Enter your Email
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing = {2}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, color: "secondary.main"}}
            >
              Reset Password
            </Button>
            <Grid item xs={12} sx={{mb:3,mt:2,py:3,mr:3,justifyContent:"center",display:"flex",color:"warning.main"}}>
              {isLoginFail && <CloseIcon sx={{mr:2}}/>}
            </Grid>

          </Grid>
          {/* <input 
            type="hidden" 
            name="csrfmiddlewaretoken" 
            value="fvA78zvMcinz7O5MlMLPqAoNdOzLCbqtkwNR8NBU501IWYmAkcIhxadpIq9J5LQ4"
            ></input> */}
        </Box>
      </Box>
        {/* <Copyright sx={{ mt: 8, mb: 10 }} /> */}
    </Container>
  );
}