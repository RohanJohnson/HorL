import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Desktop.css'
import axios from 'axios';
import { Typography, Input, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FlipNumbers from 'react-flip-numbers'



function Game() {


  const [deckState, setDeckState] = useState(null)
  const [cardDraw, setCardDraw] = useState(null)
  const [word, setWord] = useState(null)
  const [score, setScore] = useState(0);
  const [flip, setFlip] = useState(false)
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(null)

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

    setTimeout(window.location.href = './', 3000);
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

    
        setValue(null)
      try {

        const url = `https://deckofcardsapi.com/api/deck/${sessionStorage.getItem("deckID")}/draw/?count=1`

        const config = {
          method: 'get',
          url: url,
          headers: {}
        }

        const response = await axios(config);
        setCardDraw(response.data.cards[0])


        console.log(response.data.cards[0].value)

        if (value == null) {
          setValue(response.data.cards[0].value)
        }
        return(response.data.cards[0].value)

      } catch (e) {
        await newDeck()
        draw()
      }
      setCount(1)
    }
  

  async function handleSubmit(event) {
    event.preventDefault()
    let answer;
    let choice = event.target.className;
    let oldValue = cardDraw.value;

    setCardDraw(null)

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
    else if (oldValue == 10) {
      oldValue = 10;
    }
    else if (oldValue == 0) {
      oldValue = 10;
    }

    oldValue = parseInt(oldValue)





    

    let newValue = await draw();

    if (newValue == "JACK") {
      newValue = 11;
    } else if (newValue == "QUEEN") {
      newValue = 12;
    }
    else if (newValue == "KING") {
      newValue = 13;
    }
    else if (newValue == "ACE") {
      newValue = 14;
    }

    newValue = parseInt(newValue)

    function check() {
      if (oldValue > newValue) {
        answer = "lower"
      } else if (oldValue < newValue) {
        answer = "higher"
      } else {
        answer = choice;
      }
      if (answer != choice) {
        setTimeout(gameOver, 1000)
      } else {
        setScore(score + 10);
      }
    }
    setTimeout(check, 500)



  }

  if (!sessionStorage.getItem("deckID")) {
    newDeck();

  } else if (deckState == null) {
    newDeck();
  }

  if (cardDraw == null && count==0) {
    setCount(1)
    draw()
  }

  // console.log(deckState)

  imageSrc = `https://robohash.org/${word}.png`

  return (
    <div className="game">
      <div className="gameHead">
        <Link to="/"><Button color='secondary' variant="contained"><HomeIcon /></Button></Link>
        <br></br>
        <Typography variant="p">Score:
          <div className="score">
            <FlipNumbers
              play
              color="#222"
              width={50}
              height={50}
              numbers={`${score}`}
            />
          </div>
        </Typography>

        {localStorage.getItem("highscore") ?
          <Typography variant="h5">Highscore:{localStorage.getItem("highscore")}</Typography> : <Typography variant="h5">Highscore: 0</Typography>
        }
      </div>

      <br></br>

      {deckState != null ?



        <div>


          {flip == false ?
            <div>
              {cardDraw != null ?

                <div className="card-front">
                <div className="deck"></div>
                  <img className='cardImg' src={cardDraw.image} alt={cardDraw.code}></img>
                </div> : <div className="card-front"><div className="deck"></div><div className="card-back"></div></div>

              }
            </div> : <div></div>
          }
          <div className="gameBtnContainer">
          <div className="gameBtns">

            <form className="higher" onSubmit={(event) => { handleSubmit(event) }}>
              <Button color='secondary' className="gameBtn" type="submit" variant="contained"><KeyboardArrowUpIcon className='icons' /></Button>
            </form>

            <form className="lower" onSubmit={(event) => { handleSubmit(event) }}>
              <Button color='secondary' className="gameBtn" type="submit" variant="contained"><KeyboardArrowDownIcon className='icons' /></Button>
            </form>
            </div>

          </div>
        </div> : <div className="card-back"></div>
      }
    </div>
  )
}

export default Game
