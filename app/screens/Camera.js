import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './../css/Styles';

// function Camera({ navigation }) {

// var recording = false;
// var processing = false;

export default class Camera extends Component {

  state = {
    recording: false,
    processing: false,
  }
  render() {
      const { recording, processing } = this.state

          let button = (
          <TouchableOpacity
            onPress={this.startRecording.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> RECORD </Text>
          </TouchableOpacity>
        );

        if (recording) {
          button = (
            <TouchableOpacity
              onPress={this.stopRecording.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> STOP </Text>
            </TouchableOpacity>
          );
        }

        if (processing) {
          button = (
            <View style={styles.capture}>
              <Text style={{ fontSize: 14 }}> PROCESSING </Text>
            </View>
          );
        }
          return (
      <View style = {styles.container}>

        <Text style={{ fontSize: 40 }}>Camera Screen</Text>
          <RNCamera
            ref={ref => { this.camera = ref; }}
            style={{ flex: 1, width: '100%', }}
         >
          </RNCamera>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            {button}
        </View>
      </View>
    );
  }

takePicture = async function(camera) {
  if (this.camera) {
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    console.log(data.uri);
    console.log('hi');
  }
};



  async startRecording() {
      this.setState({ recording: true });
      console.log('recording');

      // default to mp4 for android as codec is not set
      const { uri, codec = "mp4" } = await this.camera.recordAsync();
      this.setState({ recording: false, processing: true });
      console.log('done');

  }

  stopRecording() {
    console.log('stopping');

      this.camera.stopRecording();
  }
}

// export default Camera;
