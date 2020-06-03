import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';


import Home from './screens/Home';
import Profile from './screens/Profile';
import Challenge from './screens/Challenge';
import Camera from './screens/Camera';
import Login from './screens/Login';
import Receive from './screens/Receive';
import Send from './screens/Send';
import UserContext from './context/UserContext';

const Stack = createStackNavigator();

class NavStack extends Component {
  render() {
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
      <Stack.Screen
        name="Receive"
        component={Receive}
      />
      <Stack.Screen
        name="Send"
        component={Send}
      />
     </Stack.Navigator>
     </NavigationContainer>
    );
  }
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
        GoogleSignin.signInSilently().then((data) => {
          this.setState({ data });
          this.setState({ isSignedIn: ret });
        });
    });
  }

  render() {
    if (!this.state.isSignedIn) {
      return <Login setUserData={this.setUserData} />;
    } else {
      return (
        <UserContext.Provider value={this.state.data.user}>
          <NavStack />
        </UserContext.Provider>
      );
    }
  }
}

export default App;
