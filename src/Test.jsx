import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ScoreBoard from './ScoreBoard'
import axios from 'axios';
import { Typography, Input, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FlipNumbers from 'react-flip-numbers'



function Test() {

  let score = "000000";

  



  return (
    // <div className="scorebox">
    //   <p>Score:</p>
    //   <div className="score">

    //     <ScoreBoard />

    //   </div>

    // </div>

    <FlipNumbers
      play
      color="#222"
      background="#aaa"
      width={50}
      height={50}
      numbers={`${score}`}
    />

  )
}

export default Test
