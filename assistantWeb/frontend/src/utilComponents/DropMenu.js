import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Cookies from 'js-cookie';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Config from '../url_config.json';


// Drop menu component to wrap some key functional buttons for navigating between pages
// Displays:
// Profile Button
// Settings Button
// Home Button
// Logout Buttons
export default function AccountMenu() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clickedHome, setClickedHome] = React.useState(false)
  const [clickedLogout, setClickedLogout] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const [image,setImage] = React.useState("")


  React.useEffect(() => {
    if(Cookies.get("username")){
      setIsLoggedIn(true)
    }
  },[])
  // Effect hook to get user profile image when the component first mounted
  React.useEffect(() => {
      axios.get(Config.Endpoints.IMAGES_URL).then(response => {
          console.log(response.data)
          if (response.data.length !== 0){
            setImage(response.data[0]["image"])
          }
          else{
            console.log("User has no image")
          }
      }).catch((error)=>{
          console.log(error.data)
      })
  },[])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/redirect')
    axios.post(Config.Authentication.REFRESH_ACCESS_URL,{"refresh":Cookies.get('refresh_token')}).then((response)=>{
        Cookies.remove('username')
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        Cookies.remove('user-id')
        Cookies.remove('first_name')
        Cookies.remove('email')
        Cookies.remove('last_name')
    }).catch((error) => {console.log(error.response)})

    setClickedLogout(true)
    axios.post(Config.Authentication.LOGOUT_URL).then((response) => {
      console.log(response.data)
    }).catch((error) => {console.log(error.response.request.responseText)})
    console.log(Cookies.get())
  }

  
  const handleProfile = () => {
    navigate('/profile')
  }

  const handleHome = () => {
    setClickedHome(true)
  }
  React.useEffect(()=>{
    if(clickedHome || clickedLogout){
      navigate('/')
    }
  },[clickedHome,clickedLogout])
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            
            <Avatar sx={{ width: 32, height: 32 }} alt={Cookies.get('username').charAt(0).toUpperCase()} src={image}>{Cookies.get('username').charAt(0).toUpperCase()}</Avatar> 

          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor:"black",
            color:"secondary.main",
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',  
            minWidth:'11%',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem onClick={handleProfile}>
            <ListItemIcon sx = {{color:'#757575'}}>
                <PersonIcon /> 
            </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <ListItemIcon sx = {{color:'#757575'}}>
                <ManageAccountsIcon /> 
            </ListItemIcon>
          My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleHome}>
          <ListItemIcon sx = {{color:'#757575'}}>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon sx = {{color:'#757575'}}>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx = {{color:'#757575'}}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
