import React, { useState } from 'react'
import { Typography, Button } from '@mui/material'
import { Link } from "react-router-dom";
import Sound from 'react-sound';
import useSound from 'use-sound';
// import './assets/click.mp3';
import Click from './assets/click.mp3';
import './Mobile.css';

let context;
let btns;






let count = 0;
// ctx.playClick();
function Menu() {



    const [volume, setVolume] = useState(null);
    const [playClick] = useSound(Click, { volume: volume });
    const [hover, setHover] = useState(false);

    function playSound() {

        // let ctx = new window.AudioContext;
        // ctx.resume();
        // playClick();
        // ctx.close()
        context = new AudioContext();
        context.resume().then(() => {
            playClick();
        }).then(() => { context.close(); })


    }

    if (!localStorage.getItem("sfx")) {
        localStorage.setItem("sfx", 0.5)
    }

    if (count == 0) {
        setVolume(localStorage.getItem("sfx"));
        console.log(localStorage.getItem("sfx"))
        count = +1;
    }


    return (
        <div>
            <div className="header">
                {/* <Typography variant="h1">Higher?</Typography> */}
                <img className="HorL-logo" src="./HorL-logo.png"></img>
                <br></br>
            </div><div className="header">
                {localStorage.getItem("highscore") ?
                    <Typography color="white" variant="h4">Highscore:{localStorage.getItem("highscore")}</Typography> : <Typography variant="h5">Highscore: --</Typography>
                }
            </div>
            <div className="btns">
                {/* <div onMouseOver={()=>{setHover(true)}}> */}
                <div >
                    <Link to='/game'>
                        <Button onClick={() => { playSound() }} color='primary' variant="contained">Play</Button>
                    </Link>

                </div>
                <Link to='/settings'>
                    <Button onMouseOver={() => { playSound() }} color='secondary' variant="contained">Settings</Button>
                </Link>
            </div>
            {/* {hover ?
                <audio autoPlay>
                    <source src="./click.mp3" type="audio/mpeg"></source>
                </audio> : <div></div>
            } */}
        </div>
    )

}

// function PlayMenuSound() {
//     console.log("hover")
//     return (
//         <audio autoPlay>
//             <source src="./click.mp3" type="audio/mpeg"></source>
//         </audio>
//     )
// }

function PlayMenuSound() {
    console.log("hover")
    return (
        playClick()
    )
}


export default Menu;