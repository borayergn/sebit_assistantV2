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
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { width } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import {Link as RouterLink } from "react-router-dom";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function ButtonAppBar() {
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

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Box
            sx={{
                mr : 50 //TODO: hard coded oldu bunu centerlamayı düzelt
            }}
            >
                <AutoStoriesIcon />
            </Box>
            <Button component = {RouterLink} to = {"/login"} color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }