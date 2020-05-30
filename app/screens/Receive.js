import React, { Component } from 'react';
import { View, Text } from 'react-native';


import { SearchBar, ListItem, Icon, Button, Input } from 'react-native-elements';

import styles from './../css/Styles';

function Receive({ navigation }) {
  return (
    <View style = {styles.container}>

    <Text style={{ fontSize: 40 }}>Running</Text>
    <Text style={{ fontSize: 20 }}>50km</Text>

      <View style = {styles.bottom}>

        <Button
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

export default Receive;
