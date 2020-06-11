import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar, ListItem, Icon, Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';

import UserContext from '../context/UserContext';

import styles from './../css/Styles';

class Receive extends Component {

  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
        metadata: this.props.route.params.metadata,
        s3key: this.props.route.params.s3key,
    };
  }

  render() {

    const { navigation } = this.props;
    let button = (

        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('Camera',
          {
            challenge: this.state.metadata,
          })
        }
          >
            <View>
              <Icon
                color='white'
                className="material-icons"
                name="radio-button-unchecked"
                size={100}
              />
            </View>
          </TouchableOpacity>
        </View>
  );
    return (
      <View style = {styles.container}>
        <View style={{paddingTop:20}}>
          <Text> { this.state.metadata } </Text>
          <View>
            <Video
              source={{
                uri: 'https://d10l22hqwt0sax.cloudfront.net/'.concat(this.state.s3key),
              }}
              style={styles.video}
              controls={false}
              resizeMode={'cover'}
              repeat={true}
              hideShutterView={true}
            />
          </View>
        </View>
        <View  style ={{position: 'absolute', left: 0, right: 0, bottom: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'center' }}>
            {button}
          </View>
        </View>
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <Receive {...props} navigation={navigation} />;
}
