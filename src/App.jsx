import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import Menu from './Menu'
import Game from './Game'
import { Button } from '@mui/material';


function App() {
    return(
    <div>



    <Router>
        <Routes>
            <Route path="/" exact element={<Menu />} />
            <Route path="/game" element={<Game />} />
        </Routes>
    </Router>
    </div>
    )
}

export default App
