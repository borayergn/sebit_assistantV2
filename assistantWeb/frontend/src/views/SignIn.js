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

import Config from '../url_config.json'
import Home from './Home';
import { CookieSharp } from '@mui/icons-material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const getTokens = (username_password) => {
  return axios.post(Config.Authentication.AUTH_TOKENS_URL+"/",username_password)
}

export default function SignIn() {

  const [isLoginFail,setIsLoginFail] = React.useState(false)
  const [isLoggedIn,setIsLoggedIn] = React.useState(false)
  const [sessionTokens,setSessionTokens] = React.useState({})
  const navigate = useNavigate()

  let loginFailMessage = "Invalid Username or Password"
  let loginSuccessMessage = "Login Succesfull."

  React.useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
    }
  },[isLoggedIn])

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let infos = {
      username: data.get('username'),
      password: data.get('password'),
    }

    //Authenticate User
    axios.post(Config.Authentication.LOGIN_URL, infos, {
      'withCredentials': true,
      }).then((response)=>{
            console.log(response.data)
            if(response.data["Status"] === loginFailMessage){
              setIsLoginFail(true)
            }
            else{
              setIsLoginFail(false)
              setIsLoggedIn(true)
              //Set Cookies
              Cookies.set("username",infos["username"])
              // let tokensPromise = getTokens(infos)
              // tokensPromise.then((response) => {axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;Cookies.set('refresh_token',response.data["refresh"]);Cookies.set('access_token',response.data["access"])}).catch((error) => {console.log(error.response.request.responseText)})
            }
          }).catch((error) => {console.log(error.response)})


    console.log(Cookies.get())
  };

  return (
    <Container maxWidth = {false}>
      <ButtonAppBar />
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing = {2}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, color: "secondary.main"}}
            >
              Sign In
            </Button>
            <Grid item xs={12} sx={{mb:3,mt:2,py:3,mr:3,justifyContent:"center",display:"flex",color:"warning.main"}}>
              {isLoginFail && <CloseIcon sx={{mr:2}}/>}
              <Typography>
                  {isLoginFail && loginFailMessage}
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component = {RouterLink} to ="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
                <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                
                >

                    <Typography sx={{color:"secondary.main"}}>Continue With Google</Typography>
                </Button>

                <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                >
                    <Typography sx={{color:"secondary.main"}}>Continue With Facebook</Typography>
                </Button>

                <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                >
                    <Typography sx={{color:"secondary.main"}}>Continue With Apple </Typography>
                </Button>

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Container>
  );
}