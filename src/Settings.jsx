import { Typography, Button, InputLabel, Input, Slider, Box } from '@mui/material'
import { Link } from 'react-router-dom';
import './App.css'
import { useState } from 'react';
import playClick from './Menu';
import { FormControl } from '@mui/material';

// onClick={() => {
//     let ctx = new window.AudioContext;
//     ctx.resume();
//     playClick();
// }}

function Settings() {

    const [sfxV, setSfxV] = useState(null)
    const [musV, setMusV] = useState(null)

    if (sfxV == null) {
        if (typeof localStorage.getItem("sfx") == "string") {
            let value = (localStorage.getItem("sfx")) * 100

            setSfxV(value);
        } else {
            setSfxV(50);
        }
    }

    if (musV == null) {
        if (typeof localStorage.getItem("mus") == "string") {
            let value = (localStorage.getItem("mus")) * 100

            setMusV(value);
        } else {
            setMusV(50);
        }
    }

    function applySettings() {
        let sfx = (document.querySelector("#sfx").children[2].children[0].value) / 100;
        localStorage.setItem("sfx", sfx)

        let mus = (document.querySelector("#music").children[2].children[0].value) / 100;
        localStorage.setItem("mus", mus)


    }

    return (
        <div className="settings">

            <div className="flexColumn">

                <Box sx={{ width: 300 }}>
                <Typography variant="h5" color="white">Sound Effects:</Typography>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={sfxV}
                        color="secondary"
                        id="sfx"
                    />
                </Box>

                <Box sx={{ width: 300 }}>
                <Typography variant="h5" color="white">Music:</Typography>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={musV}
                        color="secondary"
                        id="music"
                    />
                </Box>

                <div className="settingBtns">
                    <Link to="/">
                        <Button color="secondary" variant="outlined">Back</Button>
                    </Link>

                    <Link to="/">
                        <Button onClick={()=>{applySettings()}} color="secondary" variant="contained">Apply</Button>
                    </Link>


                </div>
            </div>

        </div>
    )
}

export default Settings;