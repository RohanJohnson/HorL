import { Component } from "react"


function Deck(props){
    let state = {
        image: props.src,
        width: props.width,
        height: props.height,
        alt: props.alt,
    }

    let decks = [
        "./cardTemp.png",
    ]
    

    
        return(
            <img className='deck' src={decks[0]} width={state.width} height={state.height} alt={state.alt}></img>
        )
    

}


export default Deck;