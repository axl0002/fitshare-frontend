import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon, Button } from 'react-native-elements';
import Video from 'react-native-video';
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
      cameraDirection: RNCamera.Constants.Type.back,
    };
  }

  render() {
      const { recording, processing } = this.state;
        let camera = (
          <RNCamera
              ref={ref => { this.camera = ref; }}
              style={{ flex: 1, width: '100%', }}
              type={this.state.cameraDirection}
           >
            </RNCamera>
        );
          let back = (
            <Button
            type="clear"
            icon = {
              <Icon
                reverse
                className="material-icons"
                name="keyboard-backspace"
                color='transparent'
                size={47}
                onPress={() => this.props.navigation.navigate('Home',
                  {
                    exercise: this.state.exercise,
                    description: this.state.description,
                  }
                )}
              />
            }
            />
          );
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
              <TouchableOpacity
              onPress={this.flipCamera.bind(this)}
              >
                <Icon
                  color='white'
                  className="material-icons"
                  name="camera-rear"
                  size={40}
                />
                </TouchableOpacity>
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

          back = (
            <View>
            </View>
          )
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

          camera = (
            <Video
              source={{
                uri: this.state.uri,
              }}
              style={styles.video}
              controls={false}
              resizeMode={'cover'}
              repeat={true}
            />
          );
        }
          return (
      <View style = {styles.container}>
            {camera}
          <View style ={{position: 'absolute', left: -20, top: -10}}>
            {back}
          </View>
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


  flipCamera() {
    if (this.state.cameraDirection ==  RNCamera.Constants.Type.back) {
      this.setState({cameraDirection: RNCamera.Constants.Type.front});
    }
    else {
      this.setState({cameraDirection: RNCamera.Constants.Type.back});
    }
  }



  async startRecording() {
      this.setState({ recording: true });

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
      this.camera.stopRecording();
  }

  retry() {
    this.setState({ recording: false, processing: false });

  }
  upload() {
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
