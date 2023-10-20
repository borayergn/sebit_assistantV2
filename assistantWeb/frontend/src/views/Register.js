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
import {Link as RouterLink } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ButtonAppBar from '../utilComponents/TopBar'
import axios from 'axios';

import Config from '../url_config.json'
import { useNavigate } from "react-router-dom";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function Register() {

  const [errors,setErrors] = React.useState([])
  const [isError,setIsError] = React.useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    setIsError(false)
    setErrors([])
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let infos = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      password_again: data.get('Re-Enter Password')
    }
    console.log(infos);


    axios.post(Config.Authentication.REGISTER_URL,infos).then((response) => {navigate("/login")}).catch((error) => {
      if(error.response){
        setIsError(true)
        for (let key in error.response.data){
          setErrors(prevErrors => [...prevErrors, error.response.data[key][0]]);
          console.log(errors)
        }
        // console.log(error.response);
        // console.log(error.response.headers);
        // console.log(error.response.request.responseText)
        // console.log(error.response.request.response)
      }
      else if(error.request){
        console.log(error.request)
      }
      else {
        console.log('Error', error.message);
      }
    })
  
  };

  return (
    <Container maxWidth = {false}>
        <ButtonAppBar />
      <Container component="main" maxWidth="xs">
        
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Re-Enter Password"
                  label="Re-Enter Password"
                  type="password"
                  id="Re-Enter Password"
                  autoComplete="Re-Enter Password"
                />
              </Grid>
              <Grid item xs={12}>
                <List>
                  {Object.keys(errors).map(function(key){ 
                    let currentErrror = errors[key]
                    return(
                      <ListItem key={key}>
                        <ListItemIcon sx = {{color:'warning.main'}}>
                          <CloseIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={currentErrror}
                          sx = {{color:'warning.main'}}
                        />
                      </ListItem>
                      )
                    
                  })}
                </List>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, color: "secondary.main"}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component = {RouterLink} to = "/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Container>
  );
}