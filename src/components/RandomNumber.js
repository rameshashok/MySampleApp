import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';


export default class RandomNumber extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        number : PropTypes.number,
        isDisabled: PropTypes.bool,
        onPress: PropTypes.func,
      }
    handlePress = () => {
        if(this.props.isDisabled) { return;}
        this.props.onPress(this.props.id);
    }
    render() {
      return (
        <TouchableOpacity onPress={this.handlePress}>
       <Text style={[styles.random , this.props.isDisabled && styles.disabled]} >{this.props.number}</Text>
       </TouchableOpacity>
      );
    }
  }
  const styles = StyleSheet.create({
  random:{
    fontSize:35,
    width:100,
    backgroundColor:'#999',
    marginHorizontal:15,
    marginVertical:25,
    textAlign:'center',
    },
    disabled:{
      opacity:0.3,
    },

    });