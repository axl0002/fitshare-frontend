import React, { Component } from 'react';
import { View, Text } from 'react-native';


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


function Profile({ navigation }) {
  return (
    <View style = {styles.container}>
      <SearchBar placeholder="Type Here..." />
      <Text style={{ fontSize: 40 }}>Profile Screen</Text>

      <Avatar
        rounded
        source={{
          uri:'https://media-exp1.licdn.com/dms/image/C5603AQFEn0wblZFgZw/profile-displayphoto-shrink_200_200/0?e=1596067200&v=beta&t=_YzQoX17JaNACtagQDpJMiD0ZeTs4zXYnTdF9MfUh4A',
        }}
        />
        <View>
          <Text>
            Alex Liu
          </Text>
        </View>
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
  );
}

export default Profile;
