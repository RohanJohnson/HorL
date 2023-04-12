import { Typography, Button } from '@mui/material'
import { Link } from "react-router-dom";

function Menu() {

    return (
        <div>
            <div className="header">
                <Typography variant="h1">Higher?</Typography>
                <br></br>

                {localStorage.getItem("highscore") ?
                    <Typography variant="h5">Highscore:{localStorage.getItem("highscore")}</Typography> : <Typography variant="h5">Highscore: 0</Typography>
                }
            </div>
            <div className="btns">
                <Link to='/game'>
                    <Button color='secondary' variant="contained">Play</Button>
                </Link>
                {/* <Link>
                    <Button variant="outlined"></Button>
                </Link> */}
            </div>
        </div>
    )

}



export default Menu;