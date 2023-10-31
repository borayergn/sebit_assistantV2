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
import Spin from '../utilComponents/SpinAnimation'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Config from '../url_config.json'
import { Cookie } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { TypeAnimation } from 'react-type-animation';
import Texts from '../utilComponents/AnimatedText';

import Cookies from 'js-cookie';
import ThreeDots from '../utilComponents/animatedDots';




export default function Home() {
  const navigate = useNavigate()

  const handleChatButton = () => {
    const csrf = Cookies.get("csrftoken")
    const token = Cookies.get("access_token")
    console.log("Token:",token,"csrf:",csrf)
    axios.post(Config.Authentication.CHECK_AUTH_URL,{'withCredentials': true }).then((response) => {
      console.log(response.data)
      Cookies.set("user-id",response.data["user-id"])
      console.log(Cookies.get())
      if(response.data["Message"] === "Authentication failed"){
          navigate('/login')
      }
      else{
        navigate('/chat')
      }
    })
  }

  const handleProfileButton = () => {
    navigate('/profile')
  }

  const [currentPaper, setCurrentPaper] = React.useState(0);

  const papers = [
    'Paper 1 Content',
    'Paper 2 Content',
    'Paper 3 Content',
  ];

  const handlePrevious = () => {
    setCurrentPaper((prevPaper) => (prevPaper > 0 ? prevPaper - 1 : papers.length - 1));
  };

  const handleNext = () => {
    setCurrentPaper((prevPaper) => (prevPaper < papers.length - 1 ? prevPaper + 1 : 0));
  };


    return (

      <Container maxWidth={false} sx = {{height:"%100"}}>
        <CssBaseline />
        <ButtonAppBar />
          <Container sx = {{
              alignItems : "center" ,
              display : "flex",
              flexDirection : "row",
              justifyContent:"center"
              }}>

            <Box
            
            sx={{
                display:"flex",
                flexGrow:0,
                height:"50vh",
                width:"40vw",
                justifyContent:"center",
                alignItems:"center",
                mt:3
            }}
          >
              <Texts />
          </Box>
        </Container>
        <Box sx ={{
              alignItems : "center" ,
              display : "flex",
              flexDirection : "column",
              justifyContent: "center",
              height: "%100",
              my : 10,
              bottom:0
              }}>
          <Grow in = {true} timeout={1750}>
            <Box sx = {{bottom:0 ,display:"flex",justifyContent:"center"}}>
              <Button onClick={handleChatButton} size="large" variant='outlined' sx = {{color : "secondary.main", fontSize : 23}}> Try Sebit Assistant</Button>
            </Box>
          </Grow>
        </Box>
        
    </Container>

    );
  };


