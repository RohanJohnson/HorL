import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Mobile.css'
import axios from 'axios';
import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FlipNumbers from 'react-flip-numbers'
import playClick from './Menu';
import Card from './Card';
import Deck from './Deck'
import GameOver from './GameOver';



function Game() {


    const [deckState, setDeckState] = useState(null)
    const [cardDraw, setCardDraw] = useState(null)
    const [word, setWord] = useState(null)
    const [score, setScore] = useState("0000");
    const [flip, setFlip] = useState(false)
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(null)
    const [over, setOver] = useState(false);



    function gameOver() {

        if (localStorage.getItem("highscore")) {
            if (parseInt(score) > localStorage.getItem("highscore")) {
                localStorage.setItem("highscore", parseInt(score))
            }
        } else {
            localStorage.setItem("highscore", parseInt(score))
        }

        setTimeout(console.log("wait"), 3000)

        newDeck();

        setOver(true);

        

        // setTimeout(window.location.href = './', 3000);
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
            setTimeout(() => { setCardDraw(response.data.cards[0]) }, 400)



            console.log(response.data.cards[0].value)

            if (value == null) {
                setValue(response.data.cards[0].value)
            }
            return (response.data.cards[0].value)

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

                let tempScore = parseInt(score) + 10;
                console.log(tempScore)
                let length = tempScore.toString().length;
                let scoreString = "";
                for (let i = length; i < 4; i++) {
                    scoreString = scoreString + "0"
                }
                console.log(scoreString)
                scoreString = scoreString + tempScore

                setScore(scoreString);
            }
        }
        setTimeout(check, 500)



    }

    if (!sessionStorage.getItem("deckID")) {
        newDeck();

    } else if (deckState == null) {
        newDeck();
    }

    if (cardDraw == null && count == 0) {
        setCount(1)
        setScore("0000");
        draw()
    }



    return (
        <div>
            {over ?
                <GameOver score={score} /> :

                <div className="game">
                    <Link className="homeBtn" to="/"><Button className="homeBtn" color='secondary' variant="contained"><HomeIcon /></Button></Link>

                    {localStorage.getItem("highscore") ?
                        <div className="highScore">
                            <Typography color="white" className="highScore" variant="h5">Highscore:{localStorage.getItem("highscore")}</Typography>
                        </div>

                        :

                        <div className="highScore">
                            <Typography color="white" className="highScore" variant="h5">Highscore: 0</Typography>
                        </div>
                    }

                    <div className="gameHead">

                        <Typography color="white" variant="p">Score:
                            <div className="score">
                                <FlipNumbers
                                    play
                                    color="white"
                                    width={50}
                                    height={50}
                                    numbers={`${score}`}
                                />
                            </div>
                        </Typography>


                    </div>

                    <br></br>

                    {deckState != null ?



                        <div className="innerCon">




                            {cardDraw != null ?

                                <div className="card-front">
                                    {/* <div className="deck"></div> */}
                                    <Deck />
                                    <Card src={cardDraw.image} alt={cardDraw.code} />
                                </div> : <div className="card-front"><Deck /><Deck /></div>

                            }


                            <div className="gameBtns">

                                <form className="higher" onSubmit={(event) => { handleSubmit(event) }}>
                                    <Button color='secondary' className="gameBtn" type="submit" variant="contained">

                                        <div className="btnText">
                                            <div><KeyboardArrowUpIcon className='icons' /></div>

                                            <div><Typography variant="h4">Higher</Typography></div>
                                        </div>

                                    </Button>
                                </form>

                                <form className="lower" onSubmit={(event) => { handleSubmit(event) }}>
                                    <Button color='secondary' className="gameBtn" type="submit" variant="contained">

                                        <div className="btnText">
                                            <div><KeyboardArrowDownIcon className='icons' /></div>

                                            <div><Typography variant="h4">Lower</Typography></div>
                                        </div>

                                    </Button>
                                </form>
                            </div>

                        </div> : <div className="card-back"></div>
                    }
                </div>}
        </div>
    )
}

export default Game
