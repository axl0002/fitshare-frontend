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
    console.log(this.state.s3key);
    return (
      <View style = {styles.container}>
        <View>
          <View>
            <Video
              source={{
                uri: 'https://d10l22hqwt0sax.cloudfront.net/'.concat(this.state.s3key).concat('.mp4'),
              }}
              style={styles.video}
              controls={false}
              resizeMode={'cover'}
              repeat={true}
              hideShutterView={true}
            />
          </View>
        </View>
        <View style ={{position: 'absolute', left: -20, top: -10}}>
        <Button
        type="clear"
        icon = {
          <Icon
            reverse
            className="material-icons"
            name="keyboard-backspace"
            color='transparent'
            size={47}
            onPress={() => this.props.navigation.navigate('Home')}
          />
        }
        />
        </View>
        <View  style ={{position: 'absolute', left: 35, right:35, top: 90}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: '#a9efe595', borderRadius:10,}}>
            <Text style={styles.sendSearchLabel}> { this.state.metadata } </Text>
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
