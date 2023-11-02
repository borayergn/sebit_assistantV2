import * as React from 'react';


import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import Cookies from 'js-cookie';
import Config from '../url_config.json'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AccountMenu from '../utilComponents/DropMenu';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import Grow from '@mui/material/Grow';
import { PieChart } from '@mui/x-charts/PieChart';
import Stack from '@mui/material/Stack';

import "../anim.css";


// Create a custom theme with your desired styles


export default function Profile(){

    const [isSettingsActive,setIsSettingsActive] = React.useState(false)
    const [isUpdated,setIsUpdated] = React.useState(false)
    const [activeButton,setActiveButton] = React.useState("None")
    const drawerWidth = 300;

    
    const infoDisplay = (info) => {
        if (info === ""){
            return " "
        }
        else{
            return info
        }
    }

    const StyledTextField = ({defaultVal,name_}) => {
        return (
            <TextField 
            defaultValue={defaultVal}
            name={name_}
                sx = {{
                    mt:2,ml:1,borderRadius:2,width:"45vw",
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#757575', // Change this to your desired outline 
                          borderRadius:2
                        },
                        '&:hover fieldset': {
                          borderColor: 'secondary.main', // Change this to your desired hover outline 
                          borderRadius:2
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'secondary.main', // Change this to your desired focus outline 
                            borderRadius:2
                          },
                      },
                }}
            ></TextField>
        )
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let infos = {
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            email: data.get("email")
        }
        console.log(infos)

        let id = Cookies.get("user-id")
        axios.patch(Config.Endpoints.USERS_URL+"/"+id+"/",infos)
        .then((response) => {
            console.log("Update Successfull")
            alert("Changes Saved")
            setIsUpdated(true)
            Cookies.set("first_name",infos["first_name"])
            Cookies.set("last_name",infos["last_name"])
            Cookies.set("email",infos["email"])
        })
        .catch((error) => {
            alert("An error occured while changing profile")
            console.log(error.response.data)
        })
    }

    const AnimatedPopup = () => {
        let opacity_ = true
        return (
            isUpdated && <Box
            className = "changes-updated"
            sx = {{opacity:1}}
            ><CheckIcon /><Typography>Changes Saved</Typography></Box>
        )
    }
    
    const AccountInfo = () => {
        return(

        <Grid item xs = {6} md = {8} sx = {{display:'flex',justifyContent:"center"}}>
            <Box
            component="form"
            sx={{
              mt:1,ml:1,borderRadius:2,width:"45vw",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grow in = {true} timeout={1250}>
            <Grid container direction={'column'} spacing={6} sx = {{mt:2}}>
                {/* <AnimatedPopup /> */}
                    
                    <Grid item xs = {6} md = {2} > 
                        <Typography variant='h5' sx = {{fontFamily:'monospace',letterSpacing:1,color:"secondary.main",fontWeight:"bold"}}>Name</Typography>
                        <StyledTextField name_ = "first_name"defaultVal={infoDisplay(Cookies.get("first_name"))} />               
                    </Grid>

                    <Grid item xs = {6} md = {2}>
                        <Typography variant='h5' sx = {{fontFamily:'monospace',letterSpacing:1,color:"secondary.main",fontWeight:"bold"}}>Surname</Typography>
                        <StyledTextField name_ = "last_name" defaultVal={infoDisplay(Cookies.get("last_name"))} />
                    </Grid>
                    <Grid item xs = {6} md = {2}>
                        <Typography variant='h5' sx = {{fontFamily:'monospace',letterSpacing:1,color:"secondary.main",fontWeight:"bold"}}>Email</Typography>
                        <StyledTextField name_ = "email" defaultVal={infoDisplay(Cookies.get("email"))} />
                    </Grid>
                    <Grid item xs = {6} md = {2}>
                        <Typography variant='h5' sx = {{fontFamily:'monospace',letterSpacing:1,color:"secondary.main",fontWeight:"bold"}}>Avatar</Typography>
                        <Button 
                        sx = {{
                            mt:2,ml:1,borderRadius:1,
                            border: '1px solid grey', // Change this to your desired outline color
                            color:"white"
                            }} 
                            variant='outlined'>
                            Upload File
                            </Button>
                    </Grid>
                    <Grid item xs = {6} md = {2} sx = {{display:"flex",justifyContent:"center",mt:3}}>
                         <Button 
                            
                            sx = {{
                                mt:2,ml:1,borderRadius:1,
                                border: '1px solid grey', // Change this to your desired outline color
                                color:"white"
                                }} 
                                variant='outlined'
                                type='submit'
                                >
                                Save Changes
                        </Button>
                    </Grid>
                     
            </Grid>  
            </Grow>
        </Box>       

    </Grid>
        )
    }

    const Settings = () => {
        return(
            <Typography>Settings</Typography>
        )
    }


      
    const Usage = () => {
        
        return(
            
                <Grid container direction={"column"} spacing={10} sx = {{display:'flex',justifyContent:"center",pt:3}}>
                    <Grow in = {true} timeout={1500}>
                        <Stack direction="row" width="100%" textAlign="center" spacing={2} sx = {{ml:35,mt:10}}>
                            <Box flexGrow={1}>
                                <Typography variant = "h5" sx = {{mr:10,py:2,fontFamily:"monospace",color:"secondary.main"}}>Your Most Used Words</Typography>
                                    <PieChart
                                        series={[
                                            {
                                            data: [
                                                { id: 0, value: 30, label: 'What' },
                                                { id: 1, value: 15, label: 'How' },
                                                { id: 2, value: 5, label: 'Can' },
                                            ],
                                            },
                                        ]}
                                        width={400}
                                        height={200}
                                        innerRadius = {30}
                                        outerRadius = {100}
                                        paddingAngle = {5}
                                        cornerRadius = {5}
                                        startAngle = {-90}
                                        endAngle = {180}
                                        cx = {150}
                                        cy = {150}
                                        />
                            </Box>
                            <Box flexGrow={1}>
                                <Typography variant = "h5" sx = {{mr:37,py:2,fontFamily:"monospace",color:"secondary.main"}}>Assistant's Most Used Words</Typography>
                                    <PieChart
                                        series={[
                                            {
                                            data: [
                                                { id: 0, value: 20, label: 'Sebit' },
                                                { id: 1, value: 15, label: 'How' },
                                                { id: 2, value: 10, label: 'Yes' },
                                            ],
                                            },
                                        ]}
                                        width={400}
                                        height={200}
                                        innerRadius = {30}
                                        outerRadius = {100}
                                        paddingAngle = {5}
                                        cornerRadius = {5}
                                        startAngle = {-90}
                                        endAngle = {180}
                                        cx = {150}
                                        cy = {150}
                                        />
                            </Box>
                        </Stack>
                    </Grow>
                    <Grow in = {true} timeout={1250}>                    
                        <Grid item xs = {6} md = {6}  sx = {{display:'flex',justifyContent:"center",alignItems:"center"}}>
                            <LineChart
                            xAxis={
                                [
                                {
                                id: 'Days',
                                data: [1,2,3,4,5,6,7],
                                label:"Days (week)"
                                },
                            ]}
                            yAxis={
                                [

                                ]
                            }
                            series={[
                                {
                                data: [200,10,500,1000,700,200,252],
                                label:"Input Tokens"
                                },
                                {
                                data: [350,35,150,2000,568,342,123],
                                label:"Output Tokens"
                                }

                            ]}
                            width={800}
                            height={400}
                
                            />
                    </Grid>
                </Grow>
        
             </Grid>
        

      )
    }

    const DynamicPage = () => {
        if(activeButton === "None"){
            return(<AccountInfo />)
        }
        else if(activeButton === "Account"){
            return(<AccountInfo />)
        }
        else if(activeButton === "Settings"){
            return(<Settings />)
        }
        else if(activeButton === "Usage"){
            return(<Usage />)
        }
    }
 
    const handleSettingsClick = () => {
        setActiveButton("Settings")
    }
    const handleAccountClick = () => {
        setActiveButton("Account")
    }
    const handleUsageClick= () => {
        setActiveButton("Usage")
    }



    return(
        <Container >
            <CssBaseline />
            <Grid container spacing = {0} >
                <Grid item xs = {6} md = {4}>
                    <Drawer
                variant="permanent"
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <List>
                    <ListItem sx = {{display:'flex',justifyContent:"center",mt:2}}>
                        <Avatar sx={{ width: 150, height: 150 }}>{Cookies.get('username').charAt(0).toUpperCase()}</Avatar> 
                    </ListItem>
                    <ListItem sx = {{display:'flex',justifyContent:"center"}}>
                        <Typography variant = 'h5' sx = {{fontWeight:'bold',fontFamily:'monospace',letterSpacing:2,color:"secondary.main"}}>{Cookies.get('username')}</Typography>
                    </ListItem>
                    <ListItem sx={{mt:1.5}}>
                        <Grid container spacing={7} >
                            <Grid item xs = {6} md = {6}  sx = {{display:'flex',justifyContent:"flex-end"}}>
                                <Button  style = {{textTransform:"none"}} variant='outlined' size = 'small' sx = {{color:'secondary.main'}} onClick={handleSettingsClick}><Typography sx = {{letterSpacing:2}}>Settings</Typography></Button>
                            </Grid>
                            <Grid item xs = {6} md = {6}  sx = {{display:'flex',justifyContent:"flex-start"}}>
                                <Button   style = {{textTransform:"none"}} variant='outlined' size = 'small' sx = {{color:'secondary.main'}} onClick={handleAccountClick}><Typography sx = {{letterSpacing:2}}>Account</Typography></Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <List sx = {{mt:2}}>
                    <ListItem sx = {{display:'flex',justifyContent:"center",mt:2}}>
                        <Button style = {{textTransform:"none"}} variant='outlined' size = 'large' sx = {{color:'secondary.main',width:"12vw"}} onClick={handleUsageClick}><Typography sx = {{letterSpacing:2}}>Usage</Typography></Button>
                    </ListItem>
                </List>
                <Box>
                    <List sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            maxWidth: 360, 
                        }}>
                        <ListItem disablePadding sx={{position : "absolute", bottom : 0}}>
                            <AccountMenu />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Grid>
            <DynamicPage />
      </Grid>
        </Container>
    )
}

