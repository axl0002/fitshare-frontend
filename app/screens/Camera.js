import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import styles from './../css/Styles';

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
      const { recording, processing } = this.state;

          let button = (
            <View style = {{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Icon
                  color='white'
                  className="material-icons"
                  name="filter"
                  size={40}
                />
              </View>
              <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                <TouchableOpacity
                onPress={this.startRecording.bind(this)}
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
              <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end',}}>
                <Icon
                  color='white'
                  className="material-icons"
                  name="camera-rear"
                  size={40}
                />
              </View>
            </View>
        );

        if (recording) {
          button = (
            <TouchableOpacity
              onPress={this.stopRecording.bind(this)}
            >
              <View>
                <Icon
                  color='red'
                  className="material-icons"
                  name="radio-button-checked"
                  size={100}
                />
              </View>
            </TouchableOpacity>
          );
        }

        if (processing) {
          button = (
            <View style = {{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={this.retry.bind(this)}
                >
                <View>
                  <Icon
                    color='white'
                    className="material-icons"
                    name="undo"
                    size={60}
                  />
                </View>
                </TouchableOpacity>
              </View>
              <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              </View>
              <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={this.upload.bind(this)}
                >
                <View>
                  <Icon
                    color='white'
                    className="material-icons"
                    name="check-circle"
                    size={60}
                  />
                </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
          return (
      <View style = {styles.container}>
          <RNCamera
            ref={ref => { this.camera = ref; }}
            style={{ flex: 1, width: '100%', }}
            type={RNCamera.Constants.Type.front}
         >
          </RNCamera>
          <View  style ={{position: 'absolute', left: 0, right: 0, bottom: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'center' }}>
              {button}
            </View>
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
    );
  }
}

// export default Camera;
