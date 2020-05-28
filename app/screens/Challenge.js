import React, { Component } from 'react';
import { View, Text } from 'react-native';


import { SearchBar, ListItem, Icon, Button } from 'react-native-elements';

import styles from './../css/Styles';

function Challenge({ navigation }) {
  return (
    <View style = {styles.container}>
      <SearchBar placeholder="Type Here..." />
      <Text style={{ fontSize: 40 }}>Challenge Screen</Text>
    </View>
  );
}

export default Challenge;
