import React, { Component } from 'react';

class Platform extends Component {


    state = {
        gravity: 1,
        friction: 0.4,
        num: 2,
        player: {
            x: 200,
            y: 200,
            x_v: 0,
            y_v: 0,
            jump: true,
            jumpStrength: -20,
            height: 40,
            width: 40,
            maxSpeed: 15,
        },
        floor: {
            x: 0,
            y: 700,
            width: 1300,
            height: 40,
        },
        floorTop: {
            x: 0,
            y: 690,
            width: 1300,
            height: 20,
        }
    }


    draw = () => {
        try {
            const ctx = document.querySelector("canvas").getContext("2d");
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
            ctx.fillStyle = "#444";
            ctx.fillRect(this.state.floor.x - 20, this.state.floor.y - 20, this.state.floor.width, this.state.floor.height);
            ctx.fillStyle = "#777";
            ctx.fillRect(this.state.floorTop.x - 20, this.state.floorTop.y - 20, this.state.floorTop.width, this.state.floorTop.height);
            ctx.fillStyle = "red";
            ctx.fillRect((this.state.player.x) - 20, (this.state.player.y) - 20, this.state.player.width, this.state.player.height)
            ctx.stroke();
        } catch (e) { }
    }

    update = () => {
        this.setState({
            friction: this.state.player.y > 640 ? 0.4 : 0.1,
            player: {
                x: this.state.player.x + this.state.player.x_v,
                y: this.state.player.y > 660 ? 660 : this.state.player.y + this.state.player.y_v,
                x_v: this.state.player.x < 1250 ? this.state.player.x > 40 ? this.state.player.x_v === 0 ? 0 : this.state.player.x_v > 0 ? this.state.player.x_v - this.state.friction : this.state.player.x_v < -this.state.friction ? this.state.player.x_v + this.state.friction : 0 : this.state.player.x_v < 0 ? (this.state.player.x_v*-.4):this.state.player.x_v : this.state.player.x_v > 0 ? (this.state.player.x_v*-.4):this.state.player.x_v,
                y_v: this.state.player.y < 660 ? (this.state.player.y_v + this.state.gravity) : 0,
                jump: true,
                jumpStrength: this.state.player.jumpStrength,
                height: this.state.player.height,
                width: this.state.player.width,
                maxSpeed: this.state.player.maxSpeed,
            }
        });
    }

    componentDidMount() {
        setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / 60);
        document.addEventListener("keyup", e => {
            
            // move right
            e.code === "KeyD" && this.state.player.x_v == 0  ? this.setState({
                player: {
                    x: this.state.player.x,
                    y: this.state.player.y,
                    x_v: this.state.player.x_v + (this.state.player.x_v < this.state.player.maxSpeed ? this.state.player.maxSpeed : 0),
                    y_v: this.state.player.y_v,
                    jump: true,
                    jumpStrength: this.state.player.jumpStrength,
                    height: this.state.player.height,
                    width: this.state.player.width,
                    maxSpeed: this.state.player.maxSpeed,
                }
            }) : null

            //move left
            e.code === "KeyA" && this.state.player.x_v == 0  ? this.setState({
                player: {
                    x: this.state.player.x,
                    y: this.state.player.y,
                    x_v: this.state.player.x_v + (this.state.player.x_v > -this.state.player.maxSpeed ? -this.state.player.maxSpeed : 0),
                    y_v: this.state.player.y_v,
                    jump: true,
                    jumpStrength: this.state.player.jumpStrength,
                    height: this.state.player.height,
                    width: this.state.player.width,
                    maxSpeed: this.state.player.maxSpeed,
                }
            }) : null
        })
        document.addEventListener("keydown", e => {

            // jump
            e.code === "KeyW" || e.code === "Space"? this.setState({
                player: {
                    x: this.state.player.x,
                    y: this.state.player.y - 1,
                    x_v: this.state.player.x_v,
                    y_v: this.state.player.y >= 660 ? this.state.player.jumpStrength : this.state.player.y_v,
                    jump: true,
                    jumpStrength: this.state.player.jumpStrength,
                    height: this.state.player.height,
                    width: this.state.player.width,
                    maxSpeed: this.state.player.maxSpeed,
                }
            }) : null

            // stop
            // e.code === "KeyS" ? this.setState({
            //     player: {
            //         x: this.state.player.x,
            //         y: this.state.player.y,
            //         x_v: 0,
            //         y_v: this.state.player.y_v,
            //         jump: true,
            //         jumpStrength: this.state.player.jumpStrength,
            //         height: this.state.player.height,
            //         width: this.state.player.width,
            //         maxSpeed: this.state.player.maxSpeed,
            //     }
            // }) : null
        })
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={1280} height={720} />
            </div>
        );
    }
}


export default Platform;