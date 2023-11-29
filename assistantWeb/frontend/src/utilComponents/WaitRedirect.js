
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom'


// A Util component for user to redirect when user is logged out for a small time
export default function WaitRedirect() {
    const navigate = useNavigate()
    const [isRedirected,setIsRedirected] = React.useState(false)
    const [formerTimeout,setFormerTimeout] = React.useState(null)

    React.useEffect(() => {
      console.log("isRedirected:",isRedirected)

      let timeout = setTimeout(()=>{
        navigate('/')
      },5000)

      if(!isRedirected){
        setFormerTimeout(timeout)
      }
      
      if(isRedirected){
        clearTimeout(timeout)
        clearTimeout(formerTimeout)
        navigate('/')
      }

    },[isRedirected])


    const handleClick = () => {
      setIsRedirected(true)
    }
    return (
      <Container sx={{height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <CssBaseline />
        <Grid direction={'column'} spacing={6} sx = {{mt:2}}>
          <Grid  item xs = {6} md = {2} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>  
            <ReactLoading  type = {"bars"} color = {"#00ADB5"} width = {175} height = {150}/>
          </Grid>

          <Grid item xs = {6} md = {2} 
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            mt:6,
            color:"secondary.main",
            }}>
            <Typography 
            sx = {{
              fontFamily:"monospace",
              fontSize:40,
            }}>Logout Successfull</Typography>
          </Grid>

          <Grid item xs = {6} md = {2} 
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            mt:1,
            color:"secondary.main",
            }}>
            <Typography 
            sx = {{
              fontFamily:"monospace",
              fontSize:30,
            }}>Redirecting</Typography>
          </Grid>
          <Grid item xs = {6} md = {2} 
          sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            mt:6,
            color:"secondary.main",
            }}>
            <Button variant='outlined' size='large' onClick={handleClick}
            sx = {{
              borderRadius:1, // Change this to your desired outline color
              color:"secondary.main",
              fontSize:15
            }}>
                Redirect
            </Button>
          </Grid>
        </Grid>
        
        
      </Container>
    );
  }