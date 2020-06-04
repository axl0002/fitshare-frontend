import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
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
        s3key: this.props.route.params.s3key,
    };
  }

  render() {
    return (
      <View>
        <Text> { this.state.metadata } </Text>
        <Video
          source={{
            uri: 'https://d10l22hqwt0sax.cloudfront.net/'.concat(this.state.s3key),
          }}
          style={styles.video}
          controls={true}
          resizeMode={'cover'}
        />
      </View>
    );
  }
}