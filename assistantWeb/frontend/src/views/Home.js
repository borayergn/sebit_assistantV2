import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import {Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from '../utilComponents/Footer'
import ButtonAppBar from '../utilComponents/TopBar'
import axios from 'axios';

import Config from '../url_config.json'
import { Cookie } from '@mui/icons-material';

import Cookies from 'js-cookie';





export default function Home() {
  const navigate = useNavigate()

  const handleChatButton = () => {
    const csrf = Cookies.get("csrftoken")
    const token = Cookies.get("access_token")
    console.log("Token:",token,"csrf:",csrf)
    axios.post(Config.Authentication.CHECK_AUTH_URL,{'withCredentials': true }).then((response) => {
      console.log(response.data)
      if(response.data["Message"] === "Authentication failed"){
          navigate('/login')
      }
      else{
        navigate('/chat')
      }
    })
  }
  
    return (

      <Container maxWidth={false} sx = {{height:"%100"}}>
        <CssBaseline />
        <ButtonAppBar />
          <Container sx = {{
              alignItems : "center" ,
              display : "flex",
              flexDirection : "column",
              }}>
            <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 200,
                height: 300,
                mt: 10,
                mb: 10,
                ml: 10,
                alignItems : "center" ,
                display : "flex",
                flexDirection : "column",

              },
            }}
          >
                <Grow in = {true} timeout={1000}>
                  <Paper  elevation={8} sx = {{  boxShadow: 3 ,overflow:"ellipsis"}}><Typography item sx ={{mt : 2}}>Cookies</Typography><Typography sx ={{mt : 3 , ml:1, color: "secondary.main"}}>{Cookies.get("csrftoken")} </Typography></Paper>
                </Grow>
                <Grow in = {true} timeout={1250}>
                  <Paper  elevation={8} sx = {{  boxShadow: 3}}><Typography item sx ={{mt : 2}}>Question?</Typography><Typography sx ={{mt : 3 , ml:1, color: "secondary.main"}}></Typography></Paper>
                </Grow>
                <Grow in = {true} timeout={1500}>
                  <Paper  elevation={8} sx = {{  boxShadow: 3 }}><Typography item sx ={{mt : 2}}>Question?</Typography> <Typography item sx ={{mt : 3 , ml:1, color: "secondary.main"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Typography></Paper>
                </Grow>
                <Grow in = {true} timeout={1750}>
                  <Paper  elevation={8} sx = {{  boxShadow: 3 }}><Typography item sx ={{mt : 2}}>Question?</Typography> <Typography item sx ={{mt : 3 , ml:1, color: "secondary.main"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Typography></Paper>
                </Grow>

          </Box>
        </Container>
        <Box sx ={{
              alignItems : "center" ,
              display : "flex",
              flexDirection : "column",
              justifyContent: "center",
              height: 100,
              my : 10
              }}>
          <Grow in = {true} timeout={1750}>
              <Button onClick={handleChatButton} variant='outlined' sx = {{color : "secondary.main", fontSize : 23}}> Try Sebit Assistant</Button>
          </Grow>
        </Box>
        
        <Box sx = {{mt:5}}>  {/* TODO: bu asagi yapısacak simdilik hardcode margin verdim düzelt */}
          <Footer/>
        </Box>
    </Container>

    );
  };


