import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import Home from './screens/Home';
import Profile from './screens/Profile';
import Challenge from './screens/Challenge';
import Camera from './screens/Camera';
import Channels from './screens/Channels';
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
        name="Channels"
        component={Channels}
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

  signOut = () => {
    GoogleSignin.signOut().then(() => {
      this.setState({ isSignedIn: false });
    });
  }

  setUserData = (data) => {
    fetch('https://fitshare-backend.herokuapp.com/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      this.setState({ data });
      this.setState({ isSignedIn: true });
    });
  }

  componentDidMount() {
    GoogleSignin.isSignedIn()
      .then((isSigned) => {
        if (isSigned) {
          GoogleSignin.signInSilently()
          .then((data) => {
            console.log(data);
            this.setState({ data });
            this.setState({ isSignedIn: true });
          });
        } else {
          this.setState({ isSignedIn: false });
        }
      });
  }

  render() {
    if (!this.state.isSignedIn) {
      return <Login setUserData={this.setUserData} />;
    } else {
      var userData = Object.assign({}, this.state.data.user, {signOut: this.signOut});
      return (
        <UserContext.Provider value={userData}>
        <SafeAreaProvider>
          <NavStack />
        </SafeAreaProvider>
        </UserContext.Provider>
      );
    }
  }
}

export default App;
