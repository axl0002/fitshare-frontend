import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar, ListItem, Icon, Button, Input } from 'react-native-elements';
import Video from 'react-native-video';

import UserContext from '../context/UserContext';

import styles from './../css/Styles';

export default class Receive extends Component {

  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
        metadata: this.props.route.params.metadata,
        uri: this.props.route.params.url,
      };
    }

  render() {
    return (
      <View style = {styles.container}>
  
      <Text style={{ fontSize: 40 }}> { this.state.metadata } </Text>
  
      <View style = {styles.container}>
        <Video source={{uri: this.state.url }} />
      </View>
        <View style = {styles.bottom}>
          icon = {
            <Icon
              reverse
              className="camera-button"
              name="camera-alt"
              size={15}
              onPress={() => navigation.navigate('Camera')}
            />
          }
          />
  
        </View>
      </View>
    );
  }
}
