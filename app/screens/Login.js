import React, { Component } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import styles from './../css/Styles';


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
      <View style = {styles.login}>
        <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onPress}/>
      </View>
    );
  }

}


export default Login;
