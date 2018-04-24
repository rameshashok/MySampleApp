import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

export default class Game extends React.Component {

    static propTypes = {
      score : PropTypes.number.isRequired,
      randomNumberCount : PropTypes.number.isRequired,
      initialSeconds : PropTypes.number.isRequired,
      onPlayAgain : PropTypes.func.isRequired,
      toIncreaseScore : PropTypes.func.isRequired,

    }
    state = {
      selectedIds : [],
      remainingSeconds : this.props.initialSeconds,
    }
    gameStatus = 'Playing';
    randomNumbers = Array.from({length : this.props.randomNumberCount}).map(()=> 1+ Math.floor(10 * Math.random()));
    
    target =  this.randomNumbers.slice(0,this.props.randomNumberCount-2).reduce((accu,curr)=>accu+curr,0);
    shuffledRandomNumbers = shuffle(this.randomNumbers);
    isNumberSelected = (numberIndex) => {
      return this.state.selectedIds.indexOf(numberIndex) >= 0;
    }  
    selectNumber = (numberIndex) => {
      this.setState((prevState)=> ({
        selectedIds: [...prevState.selectedIds,numberIndex]
      }));
    }
    componentDidMount(){
      this.intervalId = setInterval(() => {
        this.setState((prevState)=> {
          return {remainingSeconds : prevState.remainingSeconds -1};
        }, () => {
          if(this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        } 
        });
      },1000);
    }
    componentWillUpdate(nextProps,nextState) {
      if(nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
        this.gameStatus = this.calcGameStatus(nextState);
        if(this.gameStatus !== 'Playing' ) {
          clearInterval(this.intervalId);
        }
      }
    }
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }
    calcGameStatus = (nextState) => {
      console.log("calGamestatus")
      const sumSelected = nextState.selectedIds.reduce((accu,curr)=> {
        return accu + this.shuffledRandomNumbers[curr];
      }, 0);
      if(nextState.remainingSeconds === 0) {
        return "Lost";
      } 
      if(sumSelected < this.target) {
        return "Playing";
      }
      if(sumSelected == this.target) {
        this.props.toIncreaseScore();
        return "Won";
      }
      if(sumSelected > this.target) {
        return "Lost";
      }
      
    }
    
    
    
    render() {
      console.log("Game")
      const GameStatus = this.gameStatus;
      return (
        <View style={styles.container}>
        <View style={styles.timerContainer}>
        <Text style={styles.timerText}> Timer : {this.state.remainingSeconds}</Text>
        <Text style={styles.timerText}> Score : {this.props.score}</Text>

        </View>
          <Text style={[styles.target, styles[`STATUS_${GameStatus}`]]}>
            {this.target}
          </Text>        
          <View style={styles.randomContainer}>
            {this.shuffledRandomNumbers.map((item,index)=>
              <RandomNumber key={index} id={index} number={item} isDisabled={this.isNumberSelected(index) || GameStatus != 'Playing'} onPress={this.selectNumber}/>  
            )}
          </View>
          { this.gameStatus !== 'Playing' && (  
          <Button  title="Play Again" onPress={this.props.onPlayAgain} />
          )}
          
        </View>
        
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ddd',
        flex:1,
        paddingTop:60,
    },
    target:{
        fontSize:40,
        marginHorizontal:50,
        textAlign:'center',
    },
    randomContainer:{
        flex:6,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
    },
    STATUS_Playing: {
      backgroundColor:'#eee',
    },
    STATUS_Won: {
      backgroundColor:'green',
    },
    STATUS_Lost: {
      backgroundColor:'red',
    },
    timerContainer:{
      flex:1,
    //  paddingTop:30,
    },
    timerText: {
      fontSize:20,
      color: 'black',
      fontWeight:'bold',
      textAlign:'left',
    },

  });