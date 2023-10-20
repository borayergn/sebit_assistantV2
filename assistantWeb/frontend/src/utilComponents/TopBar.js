import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import {Link as RouterLink } from "react-router-dom";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountMenu from './DropMenu';

import axios from 'axios';
import Config from '../url_config.json'



export default function ButtonAppBar() {

    const [isLoggedIn,setIsLoggedIn] = React.useState(false)

    const checkAuth = () => {
      axios.get(Config.Authentication.CHECK_AUTH_URL,{'withCredentials': true}).then((response) => {
        if(response.data["Message"] === "User Authenticated"){
          setIsLoggedIn(true)
        }
        else{
          setIsLoggedIn(false)
        }
      })
    }

    checkAuth()

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx = {{color:"secondary.main", mx:0}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              component = {RouterLink}
              to = "/"
            >
              <HomeIcon />
            </IconButton>

            <Box
            sx={{
                display:"flex",
                justifyContent:"center",
                flexGrow:1
                     //TODO: hard coded oldu bunu centerlamayı düzelt
            }}
            >
                <AutoStoriesIcon />
            </Box>
            <Box sx ={{display:"flex",justifyContent:"flex-end"}}>
            {/* TODO: AccountMenu'nun buradaki displayini ve chatteki displayini ayıracak şekilde düzenlemek lazım */}
            {isLoggedIn ? <AccountMenu/>: <Button component = {RouterLink} to = {"/login"} color="inherit">Login</Button>} 
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }