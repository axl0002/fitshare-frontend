import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text } from 'react-native';
import Profile from './Profile';
import Challenge from './Challenge';
import { SearchBar, ListItem, Icon, Button} from 'react-native-elements';

import styles from './../css/Styles';


const users = [
  {
    name: 'Jack Jones',
    subtitle: 'New challenge!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'Jackson John',
    subtitle: 'Challenge accepted!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'Jacklynn Jamerson',
    subtitle: 'Challenge sent!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];

export default class Home extends Component {
  state = {
    search: '',
  }

  updateSearch = search => {
    this.setState({ search });
  };


  render() {
    const { search } = this.state;

    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={1}
        showsButtons={true}>

        <View style = {[styles.backgroundColoring, styles.container]}>
          <Profile/>
        </View>

        <View style = {[styles.backgroundColoring, styles.container]}>
          <SearchBar
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
          placeholder="Search Friends..."
          onChangeText={this.updateSearch}
          value={search}
          />
          {users.map((l, i) => (
            <ListItem
              containerStyle={styles.backgroundColoring}
              key={i}
              leftAvatar={{ source: { uri: l.avatar }, size:55 }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
            />
          ))}
        </View>

        <View style = {[styles.backgroundColoring, styles.container]}>
          <Challenge/>
        </View>

      </Swiper>
    );
  }
}
