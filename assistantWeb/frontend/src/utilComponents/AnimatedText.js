
import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';

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