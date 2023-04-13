import { Typography } from "@mui/material"

function ScoreBoard(){

let array = [0,0,0,0,0,0];

let score = array.toString()

score = score.replaceAll(",", " ")


return(
    <Typography variant="h2">{score}</Typography>
)

}

export default ScoreBoard