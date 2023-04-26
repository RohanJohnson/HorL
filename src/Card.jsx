import { Component } from "react"


function Card(props){
    let state = {
        image: props.src,
        width: props.width,
        height: props.height,
        alt: props.alt,
    }

    

    
        return(
            <img className='cardImg' src={state.image} width={state.width} height={state.height} alt={state.alt}></img>
        )
    

}


export default Card;