import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

class Login extends Component {
  constructor(props) {
    super(props);
    GoogleSignin.configure();
  }

  render() {
    var onPress = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo });
      } catch (error) {
        // leaving this here to add a loading spinner in the future (maybe)
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        } else if (error.code === statusCodes.IN_PROGRESS) {
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        } else {
        }
      }
    };

    return (
      <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={onPress}/>);
  }

}


export default Login;
