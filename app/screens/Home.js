import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text } from 'react-native';
import Profile from './Profile';
import Challenge from './Challenge';
import { SearchBar, ListItem, Icon, Button} from 'react-native-elements';

import styles from './../css/Styles';


const users = [
  {
    name: 'jack',
    subtitle: 'New challenge!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'jackson',
    subtitle: 'Challenge accepted!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'jacklynn',
    subtitle: 'Challenge sent!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];

export default class Home extends Component {
  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={1}
        showsButtons={true}>

        <View style = {styles.container}>
          <Profile/>
        </View>

        <View style = {styles.container}>
          <SearchBar placeholder="Type Here..." />
          {users.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
            />
          ))}
        </View>

        <View style = {styles.container}>
          <Challenge/>
        </View>

      </Swiper>
    );
  }
}
