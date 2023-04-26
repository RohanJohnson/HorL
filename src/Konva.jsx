import Konva from "konva";
import React, { useState } from 'react';
import './Konva.css';
import Card from './Card';

export default function TestK() {

    const [circX, setCircX] = useState(null);
    const [card, setCard] = useState(null);



    // if (document.querySelector("#containK")) {
    // let stage = new Konva.Stage({
    //     container: 'containK',
    //     width: 800,
    //     height: 500,
    //     draggable: false,
    // });

    // stage.container().style.backgroundColor = 'rgba(187, 187, 187, 0.418)';

    // if (!circX) {
    //     setCircX(stage.width() / 2);
    // }

    // let layer = new Konva.Layer();

    // function drawImage(imageObj) {

    // let cardImg = new Konva.Image({
    //     image: imageObj,
    //     x: stage.width() / 2 - 200 / 2,
    //     y: stage.height() / 2 - 137 / 2,
    //     width: 200,
    //     height: 137,
    //     draggable: true,
    // });

    //     layer.add(cardImg);

    // }

    // let cardImg = new Konva.Image({
    // image: <Card src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='23' height='23' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(154)'%3E%3Crect width='100%25' height='100%25' fill='rgba(159, 122, 234,1)'/%3E%3Cpath d='M10 10a 10 10 0 0 1 20 0a 10 10 0 0 1 0 20a 10 10 0 0 1-20 0a 10 10 0 0 1 0-20M10 14.5a 5.5 5.5 0 0 0 0 11a 4.5 4.5 0 0 1 4.5 4.5a 5.5 5.5 0 0 0 11 0a 4.5-4.5 0 0 1 4.5-4.5a 5.5 5.5 0 0 0 0-11a-4.5-4.5 0 0 1-4.5-4.5a 5.5 5.5 0 0 0-11 0a-4.5 4.5 0 0 1-4.5 4.5z' fill='%231a202c'/%3E%3Cpath d='M10 10a 10 10 0 0 1 20 0a 10 10 0 0 1 0 20a 10 10 0 0 1-20 0a 10 10 0 0 1 0-20M10 14.5a 5.5 5.5 0 0 0 0 11a 4.5 4.5 0 0 1 4.5 4.5a 5.5 5.5 0 0 0 11 0a 4.5-4.5 0 0 1 4.5-4.5a 5.5 5.5 0 0 0 0-11a-4.5-4.5 0 0 1-4.5-4.5a 5.5 5.5 0 0 0-11 0a-4.5 4.5 0 0 1-4.5 4.5z' fill='rgba(85, 60, 154,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E "/>,
    //     x: stage.width() / 2 - 200 / 2,
    //     y: stage.height() / 2 - 137 / 2,
    //     width: 200,
    //     height: 137,
    //     draggable: true,
    // });

    // let circle = new Konva.Circle({
    //     x: circX,
    //     y: stage.height() / 2,
    //     radius: 40,
    //     fill: 'red',
    //     stroke: 'black',
    //     strokeWidth: 4,
    //     draggable: true,
    // });

    // circle.on('pointerdown', () => {
    //     setCircX(circX+10);
    // })

    // let imageObj = new Image();
    // imageObj.onload = () => {
    //     drawImage(this);
    // }

    // if (!card) {
    //     // setCard("https://upload.wikimedia.org/wikipedia/commons/1/1c/PLAYING_CARD_ACE_OF_SPADES.svg");
    //     // setCard("https://img.freepik.com/free-vector/ace-spades-playing-card-isolated_1308-78891.jpg")
    // }

    // imageObj.src = card;

    // console.log(imageObj);

    // layer.add(circle);
    // layer.add(cardImg);

    // stage.add(layer);

    // layer.draw();

    

    function drawImage(imageObj) {
        var stage = new Konva.Stage({
            container: 'containK',
            width: 800,
            height: 500,
        });

        stage.container().style.backgroundColor = 'rgba(187, 187, 187, 0.418)';

        var layer = new Konva.Layer();
        // darth vader
        var darthVaderImg = new Konva.Image({
            image: imageObj,
            x: stage.width() / 2 - 200 / 2,
            y: stage.height() / 2 - 137 / 2,
            width: 120,
            height: 180,
            draggable: true,
        });

        // add cursor styling
        darthVaderImg.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        darthVaderImg.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });

        layer.add(darthVaderImg);
        stage.add(layer);
    }

    var imageObj = new Image();
    imageObj.onload = function () {
        drawImage(this);
    };
    imageObj.src = 'https://img.freepik.com/free-vector/ace-spades-playing-card-isolated_1308-78891.jpg';
    

    return (
        <div>
            {/* <Card src="./HorL-logo.png"/> */}
            <div id="containK"></div>
        </div>
    )

}