import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import UserContext from '../context/UserContext';

import { Avatar, Button } from 'react-native-elements';
import Stats from '../components/Stats';

import styles from './../css/Styles';


export default class Profile extends Component {
  static contextType = UserContext;

  render() {
    return (
      <ScrollView style = {styles.container}>
        <View style = {styles.centerObject}>
          <View style = {styles.profileAvatar}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri:'https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320086059654790795.png',
              }}
              />
            </View>
          </View>
          <Stats/>
          <Button title="logout" onPress={ this.context.signOut }/>
      </ScrollView>
    );
  }
}
