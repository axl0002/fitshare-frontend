import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { SearchBar, ListItem, Icon, Button } from 'react-native-elements';

import styles from './css/Styles';


import Home from './screens/Home';
import Profile from './screens/Profile';
import Challenge from './screens/Challenge';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator
      screenOptions={{ headerShown: false
      }}
     >
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
    </Stack.Navigator>
  );
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
};

export default App;
