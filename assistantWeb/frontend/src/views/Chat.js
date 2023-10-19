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

import Cookies from 'js-cookie';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import Config from '../url_config.json'

// 



const drawerWidth = 240;

const constantChatData = {
  "user":1,
  "chatName":"New Chat"
}



function Chat(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [input,setInput] = React.useState("")
  const [messages,setMessages] = React.useState([])
  const [chats,setChats] = React.useState("Undefined")
  const [activeButton,setActiveButton] = React.useState(0)
  const [sortOrder,setSortOrder] = React.useState(0)
  const [prediction,setPrediction] = React.useState("...")
  const [inferenceWait,setInferenceWait] = React.useState(false) //This is true if response is being waited from inference API
  
  const handleMessageState = messages.map((message, i) => {

      if (i === (messages.length - 1)){
        message.text = prediction
      }
  });

  React.useEffect(() => {
    
    if (prediction === "..."){
      setMessages(handleMessageState)
    }
  },[prediction])

  React.useEffect(() => {
    axios.get(Config.Endpoints.CHATS_URL).then((response) => {setChats(response.data)})
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  function handleDeleteButton(id){
    console.log(id)
    var deleteUrlChat = Config.Endpoints.CHATS_URL+"/"+id
    var deleteUrlMessages = Config.Endpoints.MESSAGES_URL

    
    axios.delete(deleteUrlChat).then(response => {
      console.log("Deleted post: ",id)
    })
    .catch(error => console.error(error))
  }

  function handleChatActivity(id){
    setActiveButton(id)
    if(activeButton === 0){
      setMessages([])
      return
    }
    let dataPromise = getMessages()
    let chatMessages = []
    dataPromise.then(data => {

      var lastSortOrderChat

      for (let key in data){
        if(data[key]["chat"] === id){
          let messageParse =  {id: data[key]["id"],text: data[key]["content"], sender: data[key]["sender"]}
          chatMessages.push(messageParse)
          lastSortOrderChat = data[key]["sort_order"]
        }
      }

      //Message sort order manipulation between chats
      if (chatMessages.length == 0){
        setSortOrder(0)
      }
      else{
        setSortOrder(lastSortOrderChat+1)
      }
      
      
      setMessages(chatMessages)
    })
    
  }

  const handlePrompt = (prompt_) => {
    return axios.post(Config.Endpoints.BASE_INFERENCE_URL,{"prompt":prompt_})
  }

  const handleUserPost = () => {
    return axios.post(Config.Endpoints.MESSAGES_URL+"/", {
      "content": input,
      "sort_order": sortOrder,
      "chat": activeButton,
      "sender": "user"
    })
    .then(response => ({
      id: response.data["id"],
      text: response.data["content"],
      sender: response.data["sender"]
    }));
  };

  const handleBotPost = (prompt_) => {

    console.log(prompt_)
    let data_p = handlePrompt(prompt_)
    data_p.then((response) => {console.log(response.data.generated_text);console.log("Response returned?");setInferenceWait(false); setPrediction(response.data.generated_text)})
    return axios.post(Config.Endpoints.MESSAGES_URL+"/", {
      "content": prediction,
      "sort_order": sortOrder,
      "chat": activeButton,
      "sender": "bot"
    })
    .then(responseBot => ({
      id: responseBot.data["id"],
      text: responseBot.data["content"],
      sender: responseBot.data["sender"]
    }));
  };

  function patchChatName(name){
    
      axios.patch((Config.Endpoints.CHATS_URL+"/"+activeButton+"/"),{chat_name : name.text})
      .then(response => console.log(response.data))
      .catch(error => console.error(error.response.data));

  }
  const getSessionData = () => {
    axios.post(Config.Authentication.CHECK_AUTH_URL).then((response)=>{
      console.log("Session data:",response.data)
    })
  }
  const handleSendMessage = async () => {

      const userMessage = await handleUserPost();
      setInferenceWait(true)
      const botMessage = await handleBotPost(userMessage.text);
      console.log("Prediction State:",prediction)
      console.log("botMessage.text",botMessage.text)

      

      if (sortOrder===0)
        patchChatName(userMessage)
      
      // Update the messages state with both user and bot messages
      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);

      setSortOrder(sortOrder+1) //User and Bot message pairs will have the same sort order

      getSessionData()
      
  }

  function getActiveChat(){
    let messagesPromise = getMessages()
    let activeChatUrl = Config.Endpoints.CHATS_URL+"/"+activeButton
    let activeChatPromise = axios.get(activeChatUrl)

    return activeChatPromise
  }


  function getMessages(){
    const promise = axios.get(Config.Endpoints.MESSAGES_URL)
    const dataPromise = promise.then((response) => response.data)
 
    return dataPromise
  }

  const Message = ({ message }) => {
    const isBot = message.sender === "bot";
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: isBot ? "flex-start" : "flex-end",
          mb: 2,
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            backgroundColor: isBot ? "primary.main" : "secondary.main",
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    );
  };

  const drawer = (
    <div>
      <Container sx = {{height : 100}}>
        <Toolbar sx = {{alignItems : "center" ,display : "flex",flexDirection : "column",justifyContent : "center" , height : 100 }}><Button variant='outlined' sx = {{color : 'secondary.main', height : 55 , width : 180 , whiteSpace : "nowrap"}}><Typography sx = {{fontSize : 12, letterSpacing:5 , textAlign : "left"}}>Create New</Typography>         
          <IconButton sx={{color : "secondary.main",}} size = "small" onClick={() => {
                  axios.post(Config.Endpoints.CHATS_URL+"/",constantChatData).then((response)=>{
                  handleChatActivity(response.data["id"])
                  })
                  }}>
            <AddIcon sx={{fontSize : 22}}/>
          </IconButton>
        </Button>
      </Toolbar>
      </Container>
      <Divider />
      <List sx={{display:"flex",flexDirection:'column',height : "80%", maxHeight : 750, overflowY : "auto"}}>
        {Object.keys(chats).map(function(key){ 
          
          var chatObj = chats[key]
          var chatName = chatObj["chat_name"]    
          var activity = chatObj.id === activeButton

          return(
          <ListItem key={key} disablePadding>
             <ListItemButton onClick={() => handleChatActivity(chatObj.id)} sx={{color:activity?"secondary.main":"primary.main"}}>
              <ListItemIcon style={{marginRight : "auto"}}>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary={chatName} primaryTypographyProps={{ style: { whiteSpace: "normal",  wordWrap:'break-word'} }}/>
              </ListItemButton>
              <ListItemButton sx={{display: "flex" , justifyContent: "flex-end",maxWidth:50}} onClick={() => handleDeleteButton(chatObj.id)}>
                  <ListItemIcon sx={{ display:"flex", justifyContent :"flex-end",marginRight : "auto"}}>
                      <DeleteIcon/>
                  </ListItemIcon>
              </ListItemButton>  

            
          </ListItem>
        )})}
            <Divider />
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

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
  <Container maxWidth = {false}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
    
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
          <Box sx={{display:"flex",flexDirection:'column',height : "80%", maxHeight : 850, overflowY : "auto"}}>

            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </Box>

      
        <Box sx = {{position: 'absolute',
                  bottom: 0,
                  width: '70%',
                  mb:2,
                  }}>

          <TextField fullWidth label="Enter Message" id="fullWidth" onChange ={(event) =>{setInput(event.target.value)}}  //TODO:ENTERLA MESAJ YOLLAMA BAYA BUGLI DUZELT
                onKeyDown={(event) => {
                  if(event.key === 13){
                        handleSendMessage()
                    }}}
          InputProps={{endAdornment:
          <Button color='secondary' onClick={handleSendMessage} 
>
            <SendIcon />
          </Button>}} />

        </Box>

      </Box>
    </Box>
  </Container>
  );
}


Chat.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Chat;