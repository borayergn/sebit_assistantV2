
import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';

// import Typed from 'react-typed';
import {TypeAnimation} from 'react-type-animation'

// Home page animation
export default function Texts(){
    return (
        
        <Container sx = {{display:"flex",justifyContent:"center"}}>
            <CssBaseline />
            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'What is Sebit',
                    1000,
                    'What is Raunt',
                    1000,
                    'What is V-Cloud',
                    1000,
                    'What is Hızlıgo',
                    1000,
                    'What is Vitamin',
                    1000
                ]}
                wrapper="strong"
                speed={10}
                deletionSpeed={20}
                style={{color:"#00ADB5",fontFamily:"monospace",fontSize:60}}
                repeat={Infinity}
                />
            {/* <Typed
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
            /> */}
        </Container>
    );
  };