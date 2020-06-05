import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

class Login extends Component {
  constructor(props) {
    super(props);
    GoogleSignin.configure();
  }

  render() {
    var onPress = () => {
      GoogleSignin.hasPlayServices().then((inp) => {
        return GoogleSignin.signIn();
      }).then((userInfo) => {
        this.props.setUserData(userInfo);
      });
    };

    return (
      <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={onPress}/>);
  }

}


export default Login;
