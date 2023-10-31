
import * as React from 'react';
import AccountMenu from '../utilComponents/DropMenu'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import axios, { all } from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SmartToyIcon from '@mui/icons-material/SmartToy';


import Cookies from 'js-cookie';


import Config from '../url_config.json'




import "../anim.css"
import { Group } from '@mui/icons-material';


const Spin = () => {

  const [questions,setQuestions] = React.useState([])

  return(


      <Box className = "circle" sx = {{display:"flex", justifyContent:"center"}}>
        <Typography className = "circle-inner" sx = {{display:"flex", justifyContent:"center"}}>

        </Typography>
      </Box>


  )
}
  export default Spin;