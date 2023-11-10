
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
import Typed from 'react-typed';

// Home page animation
export default function Texts(){
    return (
        
        <Container sx = {{display:"flex",justifyContent:"center"}}>
            <CssBaseline />
            <Typed
                strings={[
                    'What is Sebit',
                    'What is Raunt',
                    'What is V-Cloud',
                    'What is Hızlıgo',
                    'What is Vitamin',
                ]}
                typeSpeed={100}
                backSpeed={50}
                loop
                style={{color:"#00ADB5",fontFamily:"monospace",fontSize:60}}
            />
        </Container>
    );
  };