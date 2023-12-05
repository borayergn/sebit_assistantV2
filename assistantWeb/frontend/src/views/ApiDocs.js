import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CopyBlock, dracula } from 'react-code-blocks';
import ButtonAppBar from '../utilComponents/TopBar'
import { Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from '@mui/material/Box'
import { useNavigate } from "react-router-dom";
import Typed from 'react-typed';
import Grow from '@mui/material/Grow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Config from '../url_config.json'
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

// Main Docs Page 

  //API key creation popup
 
export default function ApiDocs(){

    const [installOpen, setInstallOpen] = React.useState(false);
  
    const handleClickOpenInstall = () => {
      setInstallOpen(true);
    };
  
    const handleCloseInstall = () => {
      setInstallOpen(false);
    };

   const navigate = useNavigate()
    
   const handleGetKeyButton = () => {
    axios.get(Config.Endpoints.API_KEYS_URL).then((response) => {
        if (response.data.length == 0){
            // call add key component
        }
        else{
            // show user keys in a popup
            
        }
    })
    //  navigate('/profile')
   }

   //Copy to clipboard util
   const CopyToClipboardButtonPIP = () => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(true);
      navigator.clipboard.writeText("pip install git+https://github.com/borayergn/saApi#egg=saApi");
    };

    return (
      <>
        <IconButton
          onClick={handleClick}
          variant="outlined"
          sx={{
            color: "white",
            display: "flex",
            justifyContent: "flex-end",
            mb: 1,
          }}
        >
          <ContentCopyIcon />
        </IconButton>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={5000}
          message="Copied to clipboard"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        />
      </>
    );
  };

// Install popup
function InstallPopup() {

    return (
      <React.Fragment>
        <Dialog
          open={installOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseInstall}
          aria-describedby="alert-dialog-slide-description"
          maxWidth = {50}
          sx = {{width:"100vw" }}
        >
          <DialogTitle sx = {{backgroundColor : "#320423"}}><Typography variant='h6'></Typography></DialogTitle>
          <DialogContent sx = {{backgroundColor : "#320423"}}>
            <DialogContentText id="alert-dialog-slide-description"  >
            <Stack direction={'row'} spacing={0.5}><Typography fontWeight={"bold"} sx = {{color:"#64d001"}}>root@user </Typography><Typography fontWeight={"bold"} sx = {{color:"white"}}>:</Typography><Typography  fontWeight={"bold"} sx = {{color:"#53719b"}}>~</Typography><Typography fontWeight={"bold"} sx = {{color:"#64d001"}}>$</Typography><Typography sx = {{color:"white"}}>pip install git+https://github.com/borayergn/saApi#egg=saApi</Typography></Stack>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx = {{backgroundColor : "#320423"}}>
             <CopyToClipboardButtonPIP />
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  

    return (
        
        <Container maxWidth = {false} sx = {{ display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"%100"}}>
            <CssBaseline />
            <Container maxWidth = {false} sx = {{width : "%100"}}>
                <ButtonAppBar />
            </Container>
            <InstallPopup />
            <Stack spacing={15} sx={{mt:15}}>

                {/* <Item sx = {{flexDirection:"row"}}><Button variant = "outlined" sx = {{color: "secondary.main" ,maxWidth:"20vw",maxHeight:"5vh"}}>Get your API key</Button></Item> */}
            
                    <Box sx = {{maxWidth:"600vw",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",flexDirection:"row"}}>
                    <CopyBlock
                        text= 
                        {  
`from saApi.inference import Inference 
api_key = $API_KEY 
inference = Inference(api_key)
answer = inference.predict("What is Sebit")` 
                        }
                        language="python"
                        showLineNumbers={true}
                        codeBlock
                        theme={dracula}

                    />
                    </Box>

                <Grow in = {true} timeout={1500}>
                    <Stack spacing={5}>
                        <Box sx = {{bottom:0 ,display:"flex",justifyContent:"center"}}>
                            <Button onClick = {handleGetKeyButton} size="large" variant='outlined' sx = {{width:"20vw",height:"6vh",borderRadius:2,color : "secondary.main", fontSize : 20}}>Get API Key</Button>
                        </Box>
                        <Box sx = {{bottom:0 ,display:"flex",justifyContent:"center"}}>
                            <Button onClick = {handleClickOpenInstall} size="large" variant='outlined' sx = {{width:"15vw",height:"6vh",borderRadius:2,color : "secondary.main", fontSize : 20}}>Install Package</Button>
                        </Box>
                    </Stack>
                </Grow>
                <Stack>
                    <Grow in = {true} timeout={1000} sx = {{width:"50vw"}}>
                        <Box sx = {{display:"flex",justifyContent:"left",alignContent:"left",alignItems:"left",flexDirection:"row"}}>
                            <Typed 
                            strings={["from saApi.inference import Inference"]}
                            typeSpeed={100}
                            style={{color:"#00ADB5",fontFamily:"monospace",fontSize:30}}
                            />
                        </Box>
                    </Grow>
                    <Grow in = {true} timeout={1000}>
                        <Box sx = {{display:"flex",justifyContent:"left",alignContent:"left",alignItems:"left",flexDirection:"row"}}>
                            <Typed 
                            strings={["api_key = $API_KEY"]}
                            typeSpeed={220}
                            style={{color:"#00ADB5",fontFamily:"monospace",fontSize:30}}
                                />
                        </Box>
                    </Grow>
                    <Grow in = {true} timeout={1000}> 
                        <Box sx = {{display:"flex",justifyContent:"left",alignContent:"left",alignItems:"left",flexDirection:"row"}}>
                            <Typed 
                                strings={["inference = Inference(api_key)"]}
                                typeSpeed={150}
                                style={{color:"#00ADB5",fontFamily:"monospace",fontSize:30}}
                                />
                        </Box>
                    </Grow>
                </Stack>
            </Stack>
        </Container>
    );
  };