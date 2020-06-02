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

  setUserData = async (data) => {
    this.setState({ data });

    fetch('https://fitshare-backend.herokuapp.com/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
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
      return (NavStack());
    }
  }
}

export default App;
