import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { CopyBlock, dracula } from "react-code-blocks";
import ButtonAppBar from "../utilComponents/TopBar";
import { Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Grow from "@mui/material/Grow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Config from "../url_config.json";
import axios from "axios";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { TypeAnimation } from "react-type-animation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TransitionClose = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// Main Docs Page

//API key creation popup

export default function ApiDocs() {
  const [installOpen, setInstallOpen] = React.useState(false);

  // UKP: User Keys Popup
  // CKP: Create Key Popup
  const [openUKP, setOpenUKP] = React.useState(false);
  const [openCKP, setOpenCKP] = React.useState(false);
  const [userKeys, setUserKeys] = React.useState([]);
  const [isKeysUpdated, setIsKeysUpdated] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [originalKeyPopupState, SetOriginalKeyPopupState] =
    React.useState(false);

  const history = useNavigate();

  const navigateToKeys = () => {
    history("/profile", { state: { fromApiDocs: true } });
  };

  const handleClickOpenCKP = () => {
    setOpenCKP(true);
  };

  const handleClickCloseCKP = () => {
    setOpenCKP(false);
  };

  const handleClickOpenUKP = () => {
    setOpenUKP(true);
  };

  const handleCloseUKP = () => {
    setOpenUKP(false);
  };

  const handleClickOpenInstall = () => {
    setInstallOpen(true);
  };

  const handleCloseInstall = () => {
    setInstallOpen(false);
  };

  const navigate = useNavigate();

  const handleGetKeyButton = () => {
    axios
      .post(Config.Authentication.CHECK_AUTH_URL, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data["Message"] === "Authentication failed") {
          navigate("/login");
        } else {
          axios.get(Config.Endpoints.API_KEYS_URL).then((response) => {
            if (response.data.length == 0) {
              console.log("if");
              handleClickOpenCKP();
              // call add key component
            } else {
              // show user keys in a popup
              axios
                .get(Config.Endpoints.API_KEYS_URL + "/")
                .then((response) => {
                  setUserKeys([]);
                  for (let index = 0; index < response.data.length; index++) {
                    const element = response.data[index];
                    setUserKeys((prevKeys) => [
                      ...prevKeys,
                      {
                        name: element["key_name"],
                        key: element["key_hash"],
                        id: element["id"],
                      },
                    ]);
                    console.log(userKeys);
                    handleClickOpenUKP();
                  }
                })
                .catch((error) => {
                  console.log(error.data);
                });
            }
          });
        }
      });
  };

  //Copy to clipboard util
  const CopyToClipboardButtonPIP = () => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(true);
      navigator.clipboard.writeText(
        "pip install git+https://github.com/borayergn/saApi#egg=saApi"
      );
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

  function CreateUserKeysPopup() {
    const handleSubmitPopup = async (event) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      let infoName = "";

      let infos = {
        name: data.get("name"),
      };

      console.log(infos["name"]);
      if (infos["name"] === "") {
        infoName = "API KEY " + (userKeys.length + 1).toString();
      } else {
        infoName = infos["name"];
      }

      console.log("infoname:", infoName);

      axios
        .post(Config.Endpoints.API_KEYS_URL + "/", {
          user: Cookies.get("user-id"),
          key_name: infoName,
        })
        .then((response) => {
          setKey(response.data["real_key"]);
          setIsKeysUpdated(true);
          SetOriginalKeyPopupState(true);
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      console.log(key);

      // handleClose()
    };

    return (
      <React.Fragment>
        <Dialog
          open={openCKP}
          onClose={handleClickCloseCKP}
          disablePortal
          TransitionComponent={Transition}
        >
          <DialogTitle sx={{ color: "secondary.main" }}>
            Create An API Key
          </DialogTitle>
          <form id="form-id" onSubmit={handleSubmitPopup}>
            <DialogContent>
              <DialogContentText>
                Once You Created The API Key, a Popup Will Appear Which Shows
                Your API Key and You Won't Be Able To See Your API Key Again.
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="API Name"
                type="name"
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: { color: "#bdbdbd" } }}
                sx={{
                  mt: 2,
                  ml: 1,
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#757575", // Change this to your desired outline
                      borderRadius: 2,
                    },
                    "&:hover fieldset": {
                      borderColor: "secondary.main", // Change this to your desired hover outline
                      borderRadius: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "secondary.main", // Change this to your desired focus outline
                      borderRadius: 2,
                    },
                  },
                  color: "#bdbdbd",
                }}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={handleClickCloseCKP}
                variant="outlined"
                sx={{ color: "secondary.main" }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="form-id"
                variant="outlined"
                sx={{ color: "secondary.main" }}
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }

  // Show User Original Key popup
  function OriginalKeyPopup() {
    const handleClose = () => {
      SetOriginalKeyPopupState(false);
      setOpenCKP(false);
    };

    return (
      <Container>
        <Dialog
          open={originalKeyPopupState}
          onClose={handleClose}
          disablePortal
          TransitionComponent={Transition}
        >
          <DialogTitle
            variant="h5"
            sx={{
              color: "secondary.main",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Your API Key
          </DialogTitle>

          <DialogContent>
            <DialogContentText
              variant="h6"
              sx={{
                fontSize: 20,
                mb: 2,
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}
            >
              You Won't Be Able To See This Key Again Please Copy and Store it
              In a Safe Storage
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="key"
              name="key"
              label="Original Key"
              type="key"
              disabled
              fullWidth
              variant="outlined"
              defaultValue={key}
              InputLabelProps={{ style: { color: "#bdbdbd" } }}
              sx={{
                mt: 2,
                ml: 1,
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#757575", // Change this to your desired outline
                    borderRadius: 2,
                  },
                  "&:hover fieldset": {
                    borderColor: "secondary.main", // Change this to your desired hover outline
                    borderRadius: 2,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main", // Change this to your desired focus outline
                    borderRadius: 2,
                  },
                },
                color: "#bdbdbd",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                color: "secondary.main",
                display: "flex",
                justifyContent: "flex-start",
                mr: 55,
              }}
            >
              Cancel
            </Button>
            <CopyToClipboardButtonKey />
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
  // A utility component to copy the API key to the clipboard
  const CopyToClipboardButtonKey = () => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(true);
      navigator.clipboard.writeText(key);
    };

    return (
      <>
        <IconButton
          onClick={handleClick}
          variant="outlined"
          sx={{
            color: "secondary.main",
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

  //Show User Keys Popup
  function UserKeysPopup() {
    return (
      <React.Fragment>
        <Dialog
          fullScreen
          open={openUKP}
          onClose={handleCloseUKP}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative", color: "secondary.main" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseUKP}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Keys
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {Object.keys(userKeys).map((key) => {
              var keyObj = userKeys[key];
              return (
                <Container maxWidth={false}>
                  <ListItem button>
                    <ListItemText
                      primary={keyObj.name}
                      secondary={"Prefix: " + keyObj.key.split(".")[0]}
                    />
                  </ListItem>
                  <Divider />
                </Container>
              );
            })}
          </List>
        </Dialog>
      </React.Fragment>
    );
  }
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
          maxWidth={50}
          sx={{ width: "100vw" }}
        >
          <DialogTitle sx={{ backgroundColor: "#320423" }}>
            <Typography variant="h6"></Typography>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#320423" }}>
            <DialogContentText id="alert-dialog-slide-description">
              <Stack direction={"row"} spacing={0.5}>
                <Typography fontWeight={"bold"} sx={{ color: "#64d001" }}>
                  root@user{" "}
                </Typography>
                <Typography fontWeight={"bold"} sx={{ color: "white" }}>
                  :
                </Typography>
                <Typography fontWeight={"bold"} sx={{ color: "#53719b" }}>
                  ~
                </Typography>
                <Typography fontWeight={"bold"} sx={{ color: "#64d001" }}>
                  $
                </Typography>
                <Typography sx={{ color: "white" }}>
                  pip install git+https://github.com/borayergn/saApi#egg=saApi
                </Typography>
              </Stack>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#320423" }}>
            <CopyToClipboardButtonPIP />
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "%100",
      }}
    >
      <CssBaseline />
      <Container maxWidth={false} sx={{ width: "%100" }}>
        <ButtonAppBar />
      </Container>

      {/* Popups */}
      <InstallPopup />
      <UserKeysPopup />
      <CreateUserKeysPopup />
      {originalKeyPopupState && <OriginalKeyPopup />}

      <Stack spacing={15} sx={{ mt: 15 }}>
        {/* <Item sx = {{flexDirection:"row"}}><Button variant = "outlined" sx = {{color: "secondary.main" ,maxWidth:"20vw",maxHeight:"5vh"}}>Get your API key</Button></Item> */}

        <Box
          sx={{
            maxWidth: "600vw",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <CopyBlock
            text={`from saApi.inference import Inference 
api_key = $API_KEY 
inference = Inference(api_key)
answer = inference.predict("What is Sebit")`}
            language="python"
            showLineNumbers={true}
            codeBlock
            theme={dracula}
          />
        </Box>

        <Grow in={true} timeout={1500}>
          <Stack spacing={5}>
            <Box sx={{ bottom: 0, display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleGetKeyButton}
                size="large"
                variant="outlined"
                sx={{
                  width: "20vw",
                  height: "6vh",
                  borderRadius: 2,
                  color: "secondary.main",
                  fontSize: 20,
                }}
              >
                Get API Key
              </Button>
            </Box>
            <Box sx={{ bottom: 0, display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleClickOpenInstall}
                size="large"
                variant="outlined"
                sx={{
                  width: "15vw",
                  height: "6vh",
                  borderRadius: 2,
                  color: "secondary.main",
                  fontSize: 20,
                }}
              >
                Install Package
              </Button>
            </Box>
          </Stack>
        </Grow>
        <Stack>
          <Grow in={true} timeout={1000} sx={{ width: "50vw" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignContent: "left",
                alignItems: "left",
                flexDirection: "row",
              }}
            >
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "from saApi.inference import Inference",
                ]}
                wrapper="strong"
                speed={5}
                style={{
                  color: "#00ADB5",
                  fontFamily: "monospace",
                  fontSize: 30,
                }}
                repeat={0}
              />
            </Box>
          </Grow>
          <Grow in={true} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignContent: "left",
                alignItems: "left",
                flexDirection: "row",
              }}
            >
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "api_key = $API_KEY",
                ]}
                wrapper="strong"
                speed={5}
                style={{
                  color: "#00ADB5",
                  fontFamily: "monospace",
                  fontSize: 30,
                }}
                repeat={0}
              />
            </Box>
          </Grow>
          <Grow in={true} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignContent: "left",
                alignItems: "left",
                flexDirection: "row",
              }}
            >
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "inference = Inference(api_key)",
                ]}
                wrapper="strong"
                speed={5}
                style={{
                  color: "#00ADB5",
                  fontFamily: "monospace",
                  fontSize: 30,
                }}
                repeat={0}
              />
            </Box>
          </Grow>
        </Stack>
      </Stack>
    </Container>
  );
}
