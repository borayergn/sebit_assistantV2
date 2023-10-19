import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme} from "@mui/material";
import axios, { all } from 'axios'
import Cookies from 'js-cookie';



const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get("access_token")}`;

const theme = createTheme(
  {
    components: {
      overrides: {
        MuiPaper: {
              alignItems : "center" ,display : "flex",flexDirection : "column",justifyContent : "center"
        },
      },
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#393E46',
      },
      secondary: {
        main: '#00ADB5',
      },
      warning: {
        main: '#A32638',
      },
    },

  }
)
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
