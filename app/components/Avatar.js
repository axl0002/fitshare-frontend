import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Avatar } from 'react-native-elements';


const avatars = [require('./../css/Avatars/0.png'),
                 require('./../css/Avatars/1.png'),
                 require('./../css/Avatars/2.png'),
                 require('./../css/Avatars/3.png'),
                 require('./../css/Avatars/4.png'),
                 require('./../css/Avatars/5.png'),
                 require('./../css/Avatars/6.png'),
                 require('./../css/Avatars/7.png'),
                 require('./../css/Avatars/8.png'),
                 require('./../css/Avatars/9.png')];

export default class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let n = Math.floor(this.props.id / 10**16) % 10
      return (
        <View>
        <Image source={avatars[n]}
        style={{ width: this.props.width, height: this.props.width, margin: 6, borderRadius: this.props.width / 2, }}/>
        </View>
      );
    }
}
