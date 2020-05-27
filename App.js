/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';

import {
  SearchBar,
} from 'react-native-elements'

const App: () => React$Node = () => {
  return (
      <SafeAreaView>
        <SearchBar placeholder="Type Here..." />
      </SafeAreaView>
  );
};

export default App;
