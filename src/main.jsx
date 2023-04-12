import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#7ac4db",
    },
    secondary: {
      main: "#d86542",
    },
  },
});




ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  // </React.StrictMode>,
)
