import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './../css/Styles';

function Camera({ navigation }) {
  return (
    <View style = {styles.container}>

      <Text style={{ fontSize: 40 }}>Camera Screen</Text>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
         }}
       >
        </RNCamera>
    </View>
  );
}

export default Camera;
