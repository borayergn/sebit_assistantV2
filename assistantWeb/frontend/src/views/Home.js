import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grow from '@mui/material/Grow';
import { useNavigate } from "react-router-dom";
import ButtonAppBar from '../utilComponents/TopBar'
import axios from 'axios';
import Config from '../url_config.json'
import Texts from '../utilComponents/AnimatedText';
import Cookies from 'js-cookie';





export default function Home() {
  const navigate = useNavigate()
  const [isLoggedIn,setIsLoggedIn] = React.useState(false)
  
  // Requests to the authentication backend;
  // If user is authenticated => navigate user to the chat interface
  // If user is not authenticated => navigate user to the login page
  const handleChatButton = () => {
    const csrf = Cookies.get("csrftoken")
    const token = Cookies.get("access_token")
    console.log("Token:",token,"csrf:",csrf)
    const cookies = Cookies.get()
    axios.post(Config.Authentication.CHECK_AUTH_URL,cookies).then((response) => {
      console.log(response.data)
      Cookies.set("user-id",response.data["user-id"])
      console.log(Cookies.get())
      if(response.data["Message"] === "Authentication failed"){
          navigate('/login')
      }
      else{
        navigate('/chat')
      }
    }).catch((error => {
      console.log(error.response.data)
    }))
  }

  const handleAPIButton = () => {
    navigate('/api_docs')
  }

  // React.useEffect(() => {
  //   axios.post(Config.Authentication.CHECK_AUTH_URL,{'withCredentials': true }).then((response) => {
  //       if(response.data["Message"] === "User Authenticated"){
  //         setIsLoggedIn(true)
  //       }
  //   })
  // },[])

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
          <Grow in = {true} timeout={1750}>
            <Box sx = {{bottom:0 ,display:"flex",justifyContent:"center",mt:5}}>
              <Button onClick={handleAPIButton} size="large" variant='outlined' sx = {{color : "secondary.main", fontSize : 23}}> Check API</Button>
            </Box>
          </Grow>
        </Box>
        
    </Container>

    );
  };


