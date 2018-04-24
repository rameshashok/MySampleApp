import React from 'react';
import Game from './Game';
//import Start from './Start';



export default class App extends React.Component {
  state = {
    gameId : 1,
    score : 0,
  };
  resetGame= () => {
    this.setState((prevState) => {
      return {gameId : prevState.gameId + 1};
    });
  };
  toIncreaseScore = () => {
    this.setState((prevState)=> {
      return { score : prevState.score + 1};
    })
  }
    

  render() {
      return (
        <Game key={this.state.gameId} onPlayAgain={this.resetGame} score={this.state.score} toIncreaseScore={this.toIncreaseScore} randomNumberCount= {6} initialSeconds= {10}/>
      );
    }
  }

  