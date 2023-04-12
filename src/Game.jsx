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



function Game() {


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

    try {

      const url = `https://deckofcardsapi.com/api/deck/${sessionStorage.getItem("deckID")}/draw/?count=1`

      const config = {
        method: 'get',
        url: url,
        headers: {}
      }

      const response = await axios(config);
      setCardDraw(response.data.cards[0])

      

      setFlip(true)

      setTimeout(setFlip(false), 3000)



      console.log(response.data.cards[0].value)

      return response.data.cards[0].value

    } catch (e) {
      await newDeck()
      draw()
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    let answer;
    let choice = event.target.className;
    let oldValue = cardDraw.value;


    if (oldValue == "JACK") {
      oldValue = 11;
    } else if (oldValue == "QUEEN") {
      oldValue = 12;
    }
    else if (oldValue == "KING") {
      oldValue = 13;
    }
    else if (oldValue == "ACE") {
      oldValue = 14;
    }






    let newValue = await draw();

    setTimeout(console.log("wait"), 2000)

    if (oldValue > newValue) {
      answer = "lower"
    } else if (oldValue < newValue) {
      answer = "higher"
    } else{
      answer = choice;
    }

    if (answer != choice) {
      gameOver()
      console.log("gameOver")
    } else {
      setScore(score + 1);
    }


  }

  if (!sessionStorage.getItem("deckID")) {
    newDeck();

  } else if (deckState == null) {
    newDeck();
  }

  if (cardDraw == null) {
    draw()
  }

  // console.log(deckState)

  imageSrc = `https://robohash.org/${word}.png`

  return (
    <div>
      <Link to="/"><Button color='secondary' variant="contained"><HomeIcon /></Button></Link>
      {deckState != null ?



        <div>
          <Typography variant="h2">Score: {score}</Typography>

          {localStorage.getItem("highscore") ?
            <Typography variant="h5">Highscore:{localStorage.getItem("highscore")}</Typography> : <Typography variant="h5">Highscore: 0</Typography>
          }

          {flip == false ?
            <div>
              {cardDraw != null ?

              <div className="card-front">
                <img className='cardImg' src={cardDraw.image}></img>
              </div> : <div className="card-back"></div>

              }
            </div>: <div className="flipping"></div>
          }
          <div className="gameBtns">

            <form className="higher" onSubmit={(event) => { handleSubmit(event) }}>
              <Button color='secondary' className="gameBtn" type="submit" variant="contained"><KeyboardArrowUpIcon className='icons' /></Button>
            </form>

            <form className="lower" onSubmit={(event) => { handleSubmit(event) }}>
              <Button color='secondary' className="gameBtn" type="submit" variant="contained"><KeyboardArrowDownIcon className='icons' /></Button>
            </form>

          </div>
        </div> : <div>loading...</div>
      }
    </div>
  )
}

export default Game
