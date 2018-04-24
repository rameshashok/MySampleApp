import React from 'react';
import Game from './Game';
import {
  StackNavigator,
} from 'react-navigation';

export default class Start extends React.Component {
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
    
//  StackNavigator({
//    Start: { screen: Start },
//    Game: { screen: Game },
//  });
    
  render() {
      return (
        <Button
        title="Welcome"
        onPress={() =>
          navigate('Game', {key:this.state.gameId, onPlayAgain:this.resetGame, score:this.state.score, toIncreaseScore:this.toIncreaseScore, randomNumberCount= 6, initialSeconds:10 } )
        }
        />
        //<Game key={this.state.gameId} onPlayAgain={this.resetGame} score={this.state.score} toIncreaseScore={this.toIncreaseScore} randomNumberCount= {6} initialSeconds= {10}/>
        
      );
    }
  }