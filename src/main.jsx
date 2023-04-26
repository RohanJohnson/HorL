import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdSpace from './AdSpace'
import './index.css'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Background from './Background'

const theme = createTheme({
  typography: {
    fontFamily: [
      'League Spartan',
    ].join(','),
  },
  // button: {
  //   fontFamily: [
  //     'League Spartan',
  //   ].join(','),
  // },
  palette: {
    primary: {
      main: "#00563E",
    },
    secondary: {
      main: "#FEA501",
    },
    white: {
      main: "#fff",
    },
  },
});




ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <div className="container">
    <Background />
      <App />
      
      {/* <AdSpace /> */}
    </div>
  </ThemeProvider>

  // </React.StrictMode>,
)
