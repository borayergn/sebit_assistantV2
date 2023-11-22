
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

import ButtonAppBar from './TopBar'
import axios from 'axios';

import Config from '../url_config.json'
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";
import { useNavigate } from 'react-router-dom'


// A Util component for user to redirect when user is logged out for a small time
export default function WaitRedirect() {
    const navigate = useNavigate()

    React.useEffect(() => {
      setTimeout(()=>{
        navigate('/')
      },5000)
    },[])

    const handleClick = () => {
      navigate('/')
    }
    return (
      <Container sx={{height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <CssBaseline />
        <Grid direction={'column'} spacing={6} sx = {{mt:2}}>
          <Grid  item xs = {6} md = {2} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>  
            <ReactLoading  type = {"bars"} color = {"#00ADB5"} width = {175} height = {150}/>
          </Grid>

          <Grid item xs = {6} md = {2} 
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            mt:6,
            color:"secondary.main",
            }}>
            <Typography 
            sx = {{
              fontFamily:"monospace",
              fontSize:40,
            }}>Logout Successfull</Typography>
          </Grid>

          <Grid item xs = {6} md = {2} 
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            mt:1,
            color:"secondary.main",
            }}>
            <Typography 
            sx = {{
              fontFamily:"monospace",
              fontSize:30,
            }}>Redirecting</Typography>
          </Grid>
          <Grid item xs = {6} md = {2} 
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            mt:6,
            color:"secondary.main",
            }}>
            <Button variant='outlined' size='large' onClick={handleClick}
            sx = {{
              borderRadius:1, // Change this to your desired outline color
              color:"secondary.main",
              fontSize:15
            }}>
                Redirect
            </Button>
          </Grid>
        </Grid>
        
        
      </Container>
    );
  }