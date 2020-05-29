import React, { Component } from 'react';
import { View, Text } from 'react-native';


import { SearchBar, ListItem, Icon, Button, Input } from 'react-native-elements';

import styles from './../css/Styles';

function Challenge({ navigation }) {
  return (
    <View style = {styles.container}>
      <SearchBar placeholder="Type Here..." />
      <Text style={{ fontSize: 40 }}>Challenge Screen</Text>

      <Text>Name of Exercise</Text>
      <Input placeholder='Exercise'/>
      <Text>Distance/ Sets and Reps/ Time</Text>
      <Input placeholder='Description'/>

      <View style={styles.navButtons}>
        <View>
          <Button
            title='Live'
          />
        </View>
        <View>
          <Button
            title='Streak'
          />
        </View>
        <View>
          <Button
            title='Battle'
          />
        </View>
      </View>

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
  );
}

export default Challenge;
