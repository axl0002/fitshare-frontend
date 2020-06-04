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
      <View style={styles.container}>
                    <Video source={{ uri: 'https://d10l22hqwt0sax.cloudfront.net/test.mp4 '}}   // Can be a URL or a local file.
                        ref={ ref => 
                            this.player = ref
                        }                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={this.videoError}               // Callback when video cannot be loaded
                        style={styles.backgroundVideo}
                        controls={true}
                        paused={false}
                        fullscreen={true}
                    />
                </View>
    );
  }
}