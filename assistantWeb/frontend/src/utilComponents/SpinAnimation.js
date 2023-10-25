
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

import Cookies from 'js-cookie';


import Config from '../url_config.json'



import "../anim.css"


const Spin = () => {

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
        <Container className="paper-slider" sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 200,
              height: 1000,
              mt: 10,
              mb: 10,
              ml: 10,
              alignItems : "center" ,
              display : "flex",
              flexDirection : "column",
            },
          }}>
          {/* <Paper elevation={3} className="paper" style={{ padding: '16px', width: '300px' }}>
            {papers[currentPaper]}
          </Paper> */}
           <Paper  elevation={8} className="paper" sx = {{  boxShadow: 3 }}><Typography item sx ={{mt : 2}}>Question?</Typography> <Typography item sx ={{mt : 3 , ml:1, color: "secondary.main"}}>{papers[currentPaper]} </Typography></Paper>
          <Button 
            sx = {{color:"secondary.main"}}
            variant="contained"
            onClick={handlePrevious}
            startIcon={<ChevronLeftIcon />}
          />

          <Button 
            sx = {{color:"secondary.main"}}
            variant="contained"
            onClick={handleNext}
            endIcon={<ChevronRightIcon />}
          />

        </Container>
      )
    }
    
//     const spinContainerStyle = {
//       position: 'relative',
//       width: '100px', // Adjust the size as needed
//       height: '100px',
//     };
  
//     const spinIconStyle = {
//       fontSize: '48px',
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       zIndex: 1,
//     };
  
//     const circleAnimationStyle = {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         border: '2px solid transparent',
//         borderRadius: '50%',
//         animation: 'circleAnimation 4s linear infinite',
//         // Keyframes animation definition

//       };
  
//     return (
//       <Container style={spinContainerStyle}>
//         <AutoStoriesIcon style={spinIconStyle} />
//         <Paper elevation={1} sx = {{  boxShadow: 3}} style={circleAnimationStyle}></Paper>
//         <Paper elevation={8} sx = {{  boxShadow: 3}} style={circleAnimationStyle}></Paper>
//         {/* Add more papers and animations as needed */}
//       </Container>
//     );
//   };
  
  export default Spin;