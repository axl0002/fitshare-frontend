import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './../css/Styles';

// function Camera({ navigation }) {

// var recording = false;
// var processing = false;

export default class Camera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      processing: false,
      description: this.props.route.params.description,
      exercise: this.props.route.params.exercise,
      uri: null,
    };
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
            <View style={styles.navButtons}>
              <View>
                <TouchableOpacity
                  onPress={this.retry.bind(this)}
                  style={styles.capture}
                >
                  <Text style={{ fontSize: 14 }}> RETRY </Text>
                </TouchableOpacity>
              <View>
              </View>
                <TouchableOpacity
                  onPress={this.upload.bind(this)}
                  style={styles.capture}
                >
                  <Text style={{ fontSize: 14 }}> DONE </Text>
                </TouchableOpacity>
              </View>
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

// takePicture = async function(camera) {
//   if (this.camera) {
//     const options = { quality: 0.5, base64: true };
//     const data = await this.camera.takePictureAsync(options);
//     console.log(data.uri);
//     console.log('hi');
//   }
// };



  async startRecording() {
      this.setState({ recording: true });
      console.log('recording..');

      // default to mp4 for android as codec is not set
      const { uri, codec = 'mp4' } = await this.camera.recordAsync();
      this.setState(
        { 
          recording: false, 
          processing: true,
          uri: uri,
        }
      );
  }

  stopRecording() {
    console.log('stop.');

      this.camera.stopRecording();
      console.log('processing video...');
  }

  retry() {
    console.log('retry');
    this.setState({ recording: false, processing: false });

  }
  upload() {
    console.log('uploading video');
    this.props.navigation.navigate('Send',
    {
      exercise: this.state.exercise,
      description: this.state.description,
      uri: this.state.uri,
    }
    )
  }
}

// export default Camera;
