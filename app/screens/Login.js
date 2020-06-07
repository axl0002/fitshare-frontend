import React, { Component } from 'react';
import { View, Image } from 'react-native';
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
        <View style = {{flex: 1, justifyContent: 'center'}}>
        <Image source={require('./../css/logo.png')}
        style={{ width: 150, height: 150 }}/>
        </View>
        <View style = {{marginBottom: 50}}>
        <GoogleSigninButton
        // size={GoogleSigninButton.Size.Wide}
        // style={{ width: Dimensions.get('window').width, height: 50 }}
        color={GoogleSigninButton.Color.Dark}
        onPress={onPress}/>
        </View>
      </View>
    );
  }

}


export default Login;
