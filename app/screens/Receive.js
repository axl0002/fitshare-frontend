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
      <View>
      <Video source={{uri: 'https://fitshare-app.s3.amazonaws.com/test.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAULIX2RFKYGIOVCCD%2F20200604%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200604T124752Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=877c8a823b8b0135fa972b219b45d42d2ed6edae75011a8f489af6265ee3b013' }}
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.backgroundVideo}/>
      </View>
    );
  }
}