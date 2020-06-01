import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { SearchBar, ListItem, Icon, Button } from 'react-native-elements';
import { GoogleSignin } from '@react-native-community/google-signin';

import styles from './css/Styles';


import Home from './screens/Home';
import Profile from './screens/Profile';
import Challenge from './screens/Challenge';
import Camera from './screens/Camera';
import Login from './screens/Login';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <NavigationContainer>

     <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="Challenge"
        component={Challenge}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  setUserData (data) {
    this.setState({ data });

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {console.log(xhr.status);};
    xhr.open('POST', 'https://fitshare-backend.herokuapp.com/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringfy(data));
  }

  componentDidMount() {
    GoogleSignin.isSignedIn().then(
      (ret) => {
        this.setState({isSignedIn: ret});
    });
  }

  render() {
    if (!this.state.isSignedIn) {
      return <Login setUserData={this.setUserData} />;
    } else {
      GoogleSignin.signOut();
      return (NavStack());
    }
  }
}

export default App;
