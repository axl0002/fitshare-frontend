import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import UserContext from '../context/UserContext';

import { Avatar, Button } from 'react-native-elements';
import Stats from '../components/Stats';
import UserAvatar from '../components/Avatar';
import styles from './../css/Styles';


export default class Profile extends Component {
  static contextType = UserContext;

  render() {
    return (
      <ScrollView style = {styles.container}>
        <View style = {styles.centerObject}>
          <View style = {styles.profileAvatar}>
              <UserAvatar id={this.context.id} width = {180}/>
          </View>
          <View style={{margin:20}}>
            <Text style={styles.profileText}>
              {this.context.name}
            </Text>
          </View>
          </View>
          <Stats/>
          <Button title="logout" onPress={ this.context.signOut }/>
      </ScrollView>
    );
  }
}
