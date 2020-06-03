import React, { Component } from 'react';
import { View, Text } from 'react-native';
import UserContext from '../context/UserContext';

import { SearchBar, ListItem, Icon, Button, Avatar } from 'react-native-elements';

import styles from './../css/Styles';

const stats = [
  {
    icon: 'http://www.clipartbest.com/cliparts/9TR/n4x/9TRn4xqTe.png',
    name: 'longest streak',
    value: '36',
  },
  {
    icon: 'http://www.clipartbest.com/cliparts/9TR/n4x/9TRn4xqTe.png',
    name: 'challenge sent',
    value: '50',
  },
  {
    icon: 'http://www.clipartbest.com/cliparts/9TR/n4x/9TRn4xqTe.png',
    name: 'challenges received',
    value: '44',
  },  {
      icon: 'http://www.clipartbest.com/cliparts/9TR/n4x/9TRn4xqTe.png',
      name: 'challenges completed',
      value: '97%',
    },
];

export default class Profile extends Component {
  static contextType = UserContext;

  state = {
    search: '',
  }

  updateSearch = search => {
    this.setState({ search });
  };


  render() {
    const { search } = this.state;

    return (
      <View style = {styles.container}>
      <SearchBar
      lightTheme
      containerStyle={styles.searchBarContainer}
      inputContainerStyle={styles.searchBarInput}
      placeholder="Search Friends..."
      onChangeText={this.updateSearch}
      value={search}
      />
        <View style = {styles.centerObject}>
          <View style = {styles.profileAvatar}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri:'https://media-exp1.licdn.com/dms/image/C5603AQFEn0wblZFgZw/profile-displayphoto-shrink_200_200/0?e=1596067200&v=beta&t=_YzQoX17JaNACtagQDpJMiD0ZeTs4zXYnTdF9MfUh4A',
              }}
              />
            </View>
            <View style={{margin:20}}>
              <Text style={styles.profileText}>
                {this.context.name}
              </Text>
            </View>
          </View>
          <View style={styles.roundedCorners}>
            {stats.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.icon } }}
                title={l.name}
                subtitle={l.value}
                bottomDivider
              />
            ))}
        </View>
      </View>
    );
  }
}
