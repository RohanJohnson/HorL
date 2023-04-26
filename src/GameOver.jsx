import { Typography, Button } from "@mui/material";

function GameOver(props) {

    let score = props.score;

    score = parseInt(score);

    return (
        <div className="gameover">
            <Typography variant="h1">Game Over</Typography>
            <Typography variant="h2">Score: {score}</Typography>

            <div className="settingBtns">
                <Button variant="contained" color="primary" onClick={() => { window.location.href = "/game" }}>Play Again</Button>
                <Button variant="contained" color="secondary" onClick={() => { window.location.href = "/" }}>Menu</Button>
            </div>
            
        </div>
    )

}

export default GameOver;