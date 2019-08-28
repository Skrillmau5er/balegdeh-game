import React from 'react';
import './App.css';
import Balegdeh from './jamaica.m4a';
import Background from './background-music.mp3';
import balegdehFace from './balegdeh_face.png';

const background = new Audio(Background);
const sound = new Audio(Balegdeh);

sound.volume = 0.5;
background.volume = 0.3;

let gameSeconds = null;

class App extends React.Component {

    state = {
      bottom: '0%',
      left: '0%',
      score: 0,
      gameOver: false,
      gameInProgress: false,
      secondsRemaining: 20,
      display: false,
    }
    
  balegdeh = () => {
    if(!this.state.gameOver){
      let bottom = Math.random() * window.innerHeight;
      let left = Math.random() * window.innerWidth;
      if(bottom > 200) bottom -= 200;
      if(left > 200) left -= 200;
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      this.setState({
        bottom: (bottom).toString() + 'px',
        left: (left).toString() + 'px',
        score: this.state.score + 1,
      });
    }
  }

  startGame = () => {
    background.play();
    this.balegdeh();
    clearInterval(gameSeconds);
    this.setState({
      gameInProgress: true,
      gameOver: false,
      score: 0,
      secondsRemaining: 20,
      display: true,
    });

    setTimeout(() => {
      this.endGame();
    }, 20000);

    gameSeconds = setInterval(() => {
      this.setState({
        secondsRemaining: this.state.secondsRemaining - 1,
      })
    }, 1000);
  }

  endGame = () => {
    this.setState({
      gameInProgress: false,
      gameOver: true,
      display: false,
    })
    clearInterval(gameSeconds);
  }

  render() {
    const balegdehDivStlye = {
      bottom: this.state.bottom,
      left: this.state.left,
      display: (this.state.display) ? 'inline-block' : 'none',
    }

    const finalScore = (this.state.gameOver) ? <h2>Amazing Balegdeh. Your Final Score was <h1 className="score">{this.state.score}</h1></h2> : ''
    return (
      <div className="App">
        {!this.state.gameInProgress && 
          <div className="content">
            {finalScore}
            <h1>Balegdeh</h1>
              <h3>How many times can you click balegdeh before the timer runs out??</h3>
            <button onClick={this.startGame} className="btn btn-danger">Start Game</button>
          </div>
        }
        
        {this.state.gameInProgress && 
          <div className="content">
            <h1 className="seconds">{this.state.secondsRemaining}</h1>
          </div>}
        <div className="balegdeh-container" id="balegdeh" onClick={this.balegdeh} style={balegdehDivStlye}>
          <img src={balegdehFace} className="balegdeh" alt="face" />
        </div>
      </div>
    );
  }
}

export default App;
