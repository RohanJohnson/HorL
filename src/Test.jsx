import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { Typography, Input, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



function Test() {


  const [deckState, setDeckState] = useState(null)
  const [cardDraw, setCardDraw] = useState(null)
  const [word, setWord] = useState(null)
  const [score, setScore] = useState(0);
  const [flip, setFlip] = useState(false)

  let imageSrc;

  // async function randWord() {
  //   const config = {
  //     method: 'get',
  //     url: 'https://api.api-ninjas.com/v1/randomword',
  //     headers: { 'X-Api-Key': 'OPMvfSI+gYDlMHUkckT7LQ==VfV4LGgvBKnv9e1i' }
  //   }


  //   const response = await axios(config)

  //   if (typeof response != Promise) {
  //     const word = response.data.word.toString();
  //     console.log(word)
  //     setWord(word);

  //   }
  // }



  function gameOver() {

    if (localStorage.getItem("highscore")) {
      if (score > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", score)
      }
    } else {
      localStorage.setItem("highscore", score)
    }

    setTimeout(console.log("wait"), 3000)

    newDeck();

    setScore(0);

    window.location.href = './'
  }

  async function setDeck() {

    setDeckState(sessionStorage.getItem("deckID"))

  }

  async function newDeck() {

    const config = {
      method: 'get',
      url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
      headers: {}
    }

    const deck = await axios(config);
    setDeckState(deck.data);
    sessionStorage.setItem("deckID", deck.data.deck_id)
    console.log(deck.data.deck_id)


  }

  async function draw() {


      const url = `https://deckofcardsapi.com/api/deck/${sessionStorage.getItem("deckID")}/draw/?count=52`

      const config = {
        method: 'get',
        url: url,
        headers: {}
      }

      const response = await axios(config);
      setCardDraw(response.data.cards[0])

      console.log(response.data.cards)

      
    
  }



  if (!sessionStorage.getItem("deckID")) {
    newDeck();

  } else if (deckState == null) {
    newDeck();
  }

  if (cardDraw == null) {
    draw()
  }


  return
}

export default Test
