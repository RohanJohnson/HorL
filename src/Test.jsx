import React, { Component } from 'react';
class Test extends Component {
  state = {
    gravity: 2,
    lift: -40,
    bird: {
      x: 50,
      y: 100,
      velocity: 0,
      radius: 20
    },
    wall: {
      width: 1,
      length: 100,
      x: 100,
      y: 50

    }
  }
  draw = () => {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, this.refs.canvas.width,
      this.refs.canvas.height);
    ctx.beginPath();
    ctx.arc(this.state.bird.x, this.state.bird.y,
      this.state.bird.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.state.wall.x, this.state.wall.y);
    ctx.lineTo(this.state.wall.x, this.state.wall.y + this.state.wall.length);
    ctx.stroke();

  }
  update = () => {

    this.setState({
      bird: {
        x: Math.max(
          Math.min(
            this.state.bird.x,
            this.refs.canvas.width - this.state.bird.radius
          ),
          0
        ),
        y: Math.max(
          Math.min(
            this.state.bird.y,
            this.refs.canvas.height - this.state.bird.radius
          ),
          0
        ),
        radius: 20
      }
    });
  }
  componentDidMount() {
    setInterval(() => {
      this.update();
      this.draw();
    }, 1000 / 120);
    document.addEventListener("keydown", e => {

      e.code === "KeyW" ? this.setState({
        bird: {
          x: this.state.bird.x,
          y: this.state.bird.y - 5,
          velocity: this.state.bird.velocity + this.state.lift,
          radius: 20
        }
      }) : null

      e.code === "KeyS" ? this.setState({
        bird: {
          x: this.state.bird.x,
          y: this.state.bird.y + 5,
          velocity: this.state.bird.velocity + this.state.lift,
          radius: 20
        }
      }) : null

      e.code === "KeyA" ? this.setState({
        bird: {
          x: this.state.bird.x - 5,
          y: this.state.bird.y,
          velocity: this.state.bird.velocity + this.state.lift,
          radius: 20
        }
      }) : null
      if (this.state.bird.x == this.state.wall.x - this.state.bird.radius && this.state.bird.y + this.state.bird.radius >= this.state.wall.y && this.state.bird.y - this.state.bird.radius <= this.state.wall.y + this.state.wall.length) {
        
      }else{
        e.code === "KeyD" ? this.setState({
          bird: {
            x: this.state.bird.x + 5,
            y: this.state.bird.y,
            velocity: this.state.bird.velocity + this.state.lift,
            radius: 20
          }
        }) : null
      }
    }
    );
  }
  render() {
    return (
      <div>
        <canvas ref="canvas" width={1280} height={720} />
      </div>
    );
  }
}
export default Test;