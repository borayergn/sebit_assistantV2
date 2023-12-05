import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { Button, Container, IconButton } from "@mui/material";
import Cookies from "js-cookie";
import Config from "../url_config.json";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AccountMenu from "../utilComponents/DropMenu";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";
import Grow from "@mui/material/Grow";
import { PieChart } from "@mui/x-charts/PieChart";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "reactjs-popup/dist/index.css";
import "../anim.css";
import { Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#103142",
    color: "#00adb5",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#121212",
    color: "#00adb5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Create a custom theme with your desired styles

export default function Profile() {
  const [isSettingsActive, setIsSettingsActive] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState("None");
  const [userKeys, setUserKeys] = React.useState([]);
  const [isKeysUpdated, setIsKeysUpdated] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [originalKeyPopupState, SetOriginalKeyPopupState] = React.useState(false);
  const [image, setImage] = React.useState("");

  const drawerWidth = 300;

  // Effect hook to get user profile image when the component first mounted
  React.useEffect(() => {
    axios
      .get(Config.Endpoints.IMAGES_URL)
      .then((response) => {
        if (response.data.length !== 0) {
          setImage(response.data[0]["image"]);
        } else {
          console.log("User has no image");
          setImage("None");
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  // Effect hook to handle API key list when its updated
  React.useEffect(() => {
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
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, [isKeysUpdated]);

  //Effect hook to return key update state to false after an update
  React.useEffect(() => {
    if (isKeysUpdated === true) {
      setTimeout(() => {
        setIsKeysUpdated(false);
      }, 1);
    }
  }, [isKeysUpdated]);

  //Effect hook to return profile update state to false after an update
  React.useEffect(() => {
    if (isUpdated === true) {
      setTimeout(() => {
        setIsUpdated(false);
      }, 5000);
    }
  }, [isUpdated]);

  //Utility display function for account page
  const infoDisplay = (info) => {
    if (info === "") {
      return " ";
    } else {
      return info;
    }
  };

  //A specific text field component
  const StyledTextField = ({ defaultVal, name_ }) => {
    return (
      <TextField
        defaultValue={defaultVal}
        name={name_}
        sx={{
          mt: 2,
          ml: 1,
          borderRadius: 2,
          width: "45vw",
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
        }}
      ></TextField>
    );
  };

  //An allert component for account page to warn user that changes have been saved
  const ChangesSavedAlert = () => {
    return (
      isUpdated && (
        <Box
          className="changes-updated"
          sx={{
            position: "absolute",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 1,
            width: "15vw",
            height: "8vh",
            borderColor: "primary.main",
          }}
        >
          <Stack direction="row" spacing={1}>
            <CheckIcon sx={{ color: "secondary.main", fontSize: 30 }} />
            <Typography variant="h5" sx={{ color: "secondary.main" }}>
              Changes Saved
            </Typography>
          </Stack>
        </Box>
      )
    );
  };

  //Form submit handler for handle account information change
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let infos = {
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
    };
    console.log(infos);

    let id = Cookies.get("user-id");
    axios
      .patch(Config.Endpoints.USERS_URL + "/" + id + "/", infos)
      .then((response) => {
        console.log("Update Successfull");
        //alert("Changes Saved")
        setIsUpdated(true);
        Cookies.set("first_name", infos["first_name"]);
        Cookies.set("last_name", infos["last_name"]);
        Cookies.set("email", infos["email"]);
      })
      .catch((error) => {
        alert("An error occured while changing profile");
        console.log(error.response.data);
      });
  };

  //Account info page component
  const AccountInfo = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    function UploadPPDialog() {
      return (
        <React.Fragment>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Upload Profile Photo</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden />
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    }

    return (
      <Grid
        item
        xs={6}
        md={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <UploadPPDialog></UploadPPDialog>
        <Box
          component="form"
          sx={{
            mt: 1,
            ml: 1,
            borderRadius: 2,
            width: "45vw",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* <Grow in = {true} timeout={1250}> */}
          <Grid container direction={"column"} spacing={6} sx={{ mt: 2 }}>
            <Grid item xs={6} md={2}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  color: "secondary.main",
                  fontWeight: "bold",
                }}
              >
                Name
              </Typography>
              <StyledTextField
                name_="first_name"
                defaultVal={infoDisplay(Cookies.get("first_name"))}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  color: "secondary.main",
                  fontWeight: "bold",
                }}
              >
                Surname
              </Typography>
              <StyledTextField
                name_="last_name"
                defaultVal={infoDisplay(Cookies.get("last_name"))}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  color: "secondary.main",
                  fontWeight: "bold",
                }}
              >
                Email
              </Typography>
              <StyledTextField
                name_="email"
                defaultVal={infoDisplay(Cookies.get("email"))}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  color: "secondary.main",
                  fontWeight: "bold",
                }}
              >
                Avatar
              </Typography>
              <Button
                sx={{
                  mt: 2,
                  ml: 1,
                  borderRadius: 1,
                  border: "1px solid grey", // Change this to your desired outline color
                  color: "white",
                }}
                variant="outlined"
                onClick={handleClickOpen}
              >
                Upload File
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
              sx={{
                display: "flex",
                position: "relative",
                zIndex: 1,
                justifyContent: "center",
              }}
            >
              <ChangesSavedAlert />
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
            >
              <Button
                sx={{
                  mt: 2,
                  ml: 1,
                  borderRadius: 1,
                  border: "1px solid grey", // Change this to your desired outline color
                  color: "white",
                }}
                variant="outlined"
                type="submit"
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
          {/* </Grow> */}
        </Box>
      </Grid>
    );
  };

  //A component to show currently selected page to the user
  const ActiveStateButton = ({ button_name, handleFunc }) => {
    if (button_name === activeButton) {
      return (
        <Button
          button_name={button_name}
          style={{ textTransform: "none" }}
          variant="outlined"
          size="small"
          sx={{
            color: "secondary.main",
            backgroundColor: "#103142",
            ":hover": { bgcolor: "#2B4E5E" },
          }}
          onClick={handleFunc}
        >
          <Typography sx={{ letterSpacing: 2 }}>{button_name}</Typography>
        </Button>
      );
    } else {
      return (
        <Button
          style={{ textTransform: "none" }}
          variant="outlined"
          size="small"
          sx={{ color: "secondary.main", ":hover": { bgcolor: "#2B4E5E" } }}
          onClick={handleFunc}
        >
          <Typography sx={{ letterSpacing: 2 }}>{button_name}</Typography>
        </Button>
      );
    }
  };

  // Settings page component
  const Settings = () => {
    return <Typography>Settings</Typography>;
  };

  //Usage page component
  const Usage = () => {
    return (
      <Grid
        container
        direction={"column"}
        spacing={10}
        sx={{ display: "flex", justifyContent: "center", pt: 3 }}
      >
        <Grow in={true} timeout={1500}>
          <Stack
            direction="row"
            width="100%"
            textAlign="center"
            spacing={2}
            sx={{ ml: 35, mt: 10 }}
          >
            <Box flexGrow={1}>
              <Typography
                variant="h5"
                sx={{
                  mr: 10,
                  py: 2,
                  fontFamily: "monospace",
                  color: "secondary.main",
                }}
              >
                Your Most Used Words
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 30, label: "What" },
                      { id: 1, value: 15, label: "How" },
                      { id: 2, value: 5, label: "Can" },
                    ],
                  },
                ]}
                width={400}
                height={200}
                innerRadius={30}
                outerRadius={100}
                paddingAngle={5}
                cornerRadius={5}
                startAngle={-90}
                endAngle={180}
                cx={150}
                cy={150}
              />
            </Box>
            <Box flexGrow={1}>
              <Typography
                variant="h5"
                sx={{
                  mr: 37,
                  py: 2,
                  fontFamily: "monospace",
                  color: "secondary.main",
                }}
              >
                Assistant's Most Used Words
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 20, label: "Sebit" },
                      { id: 1, value: 15, label: "How" },
                      { id: 2, value: 10, label: "Yes" },
                    ],
                  },
                ]}
                width={400}
                height={200}
                innerRadius={30}
                outerRadius={100}
                paddingAngle={5}
                cornerRadius={5}
                startAngle={-90}
                endAngle={180}
                cx={150}
                cy={150}
              />
            </Box>
          </Stack>
        </Grow>
        <Grow in={true} timeout={1250}>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LineChart
              xAxis={[
                {
                  id: "Days",
                  data: [1, 2, 3, 4, 5, 6, 7],
                  label: "Days (week)",
                },
              ]}
              yAxis={[]}
              series={[
                {
                  type: "line",
                  data: [200, 10, 500, 1000, 700, 200, 252],
                  label: "Input Tokens",
                },
                {
                  type: "line",
                  data: [350, 35, 150, 2000, 568, 342, 123],
                  label: "Output Tokens",
                },
                {
                  type: "line",
                  data: [550, 45, 650, 3000, 1258, 542, 375],
                  label: "Total Tokens",
                },
              ]}
              width={800}
              height={400}
            />
          </Grid>
        </Grow>
      </Grid>
    );
  };

  //API key creation popup
  function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const handleSubmitPopup = async (event) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      let infoName = "";

      let infos = {
        name: data.get("name"),
      };

      console.log(infos["name"])
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
      <Container>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            color: "secondary.main",
            height: 55,
            width: 180,
            whiteSpace: "nowrap",
            ml: 136,
          }}
        >
          <Typography
            sx={{ fontSize: 12, letterSpacing: 5, textAlign: "left" }}
          >
            Create New
          </Typography>
          <IconButton sx={{ color: "secondary.main" }} size="small">
            <AddIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Button>

        <Dialog open={open} onClose={handleClose} disablePortal>
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
                onClick={handleClose}
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
      </Container>
    );
  }

  // A utility component to copy the API key to the clipboard
  const CopyToClipboardButton = () => {
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

  //A popup to show original key to the user once.
  function OriginalKeyPopup() {
    const handleClose = () => {
      SetOriginalKeyPopupState(false);
    };

    return (
      <Container>
        <Dialog
          open={originalKeyPopupState}
          onClose={handleClose}
          disablePortal
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
            <CopyToClipboardButton />
          </DialogActions>
        </Dialog>
      </Container>
    );
  }

  // A component to display user API Keys
  function CustomizedTables() {
    return (
      <Container>
        <FormDialog></FormDialog>

        <TableContainer component={Paper} sx={{ ml: 15, mt: 5 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="left">Prefix</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userKeys.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.key.split(".")[0]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      onClick={() => {
                        axios
                          .delete(
                            Config.Endpoints.API_KEYS_URL + "/" + row.id + "/"
                          )
                          .then((response) => {
                            console.log(response.data);
                            setIsKeysUpdated(true);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }

  const ApiKeys = () => {
    return (
      <Grid container direction={"column"} spacing={6} sx={{ mt: 2 }}>
        <CustomizedTables></CustomizedTables>
        {originalKeyPopupState && <OriginalKeyPopup />}
      </Grid>
    );
  };

  // A wrapper component to switch between sub-components(pages)
  // A string state which changes on button clicks is managing these sub-component switchs
  const DynamicPage = () => {
    if (activeButton === "None") {
      return <AccountInfo />;
    } else if (activeButton === "Account") {
      return <AccountInfo />;
    } else if (activeButton === "Settings") {
      return <Settings />;
    } else if (activeButton === "Usage") {
      return <Usage />;
    } else if (activeButton === "API Keys") {
      return <ApiKeys />;
    }
  };

  // Changes string state to call the right sub-component (page)
  const handleSettingsClick = () => {
    setActiveButton("Settings");
  };
  const handleAccountClick = () => {
    setActiveButton("Account");
  };
  const handleUsageClick = () => {
    setActiveButton("Usage");
  };
  const handleApiKeysClick = () => {
    setActiveButton("API Keys");
  };

  // General profile page
  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={0}>
        <Grid item xs={6} md={4}>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <List>
              <ListItem
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  alt={Cookies.get("username").toUpperCase()}
                  src={image}
                >
                  {Cookies.get("username").charAt(0).toUpperCase()}
                </Avatar>
              </ListItem>
              <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    letterSpacing: 2,
                    color: "secondary.main",
                  }}
                >
                  {Cookies.get("username")}
                </Typography>
              </ListItem>
              <ListItem sx={{ mt: 1.5 }}>
                <Grid container spacing={7}>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <ActiveStateButton
                      button_name="Settings"
                      handleFunc={handleSettingsClick}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <ActiveStateButton
                      button_name="Account"
                      handleFunc={handleAccountClick}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            <Divider />
            <List sx={{ mt: 2 }}>
              <ListItem
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <ActiveStateButton
                  button_name="Usage"
                  handleFunc={handleUsageClick}
                />
              </ListItem>
              <ListItem
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <ActiveStateButton
                  button_name="API Keys"
                  handleFunc={handleApiKeysClick}
                />
              </ListItem>
            </List>
            <Box>
              <List
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  maxWidth: 360,
                }}
              >
                <ListItem
                  disablePadding
                  sx={{ position: "absolute", bottom: 0 }}
                >
                  <AccountMenu />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Grid>
        <DynamicPage />
      </Grid>
    </Container>
  );
}
