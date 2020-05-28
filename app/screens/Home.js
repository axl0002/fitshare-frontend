import React, { Component } from 'react';
import { View, Text } from 'react-native';


import { SearchBar, ListItem, Icon, Button } from 'react-native-elements';

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

function Home({ navigation }) {
  return (
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

      <View style={styles.bottom}>
        <View style={styles.navButtons}>
          <View>
            <Button
              icon = {
                <Icon
                  reverse
                  className="profile-button"
                  name="person"
                  size={15}
                />
              }
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
          <View>
            <Button
              icon = {
                <Icon
                  reverse
                  className="home-button"
                  name="home"
                  size={30}
                />
              }
            />
          </View>
          <View>
            <Button
              icon = {
                <Icon
                  reverse
                  className="camera-button"
                  name="camera-alt"
                  size={15}
                />
              }
              onPress={() => navigation.navigate('Challenge')}
            />
          </View>
        </View>
      </View>

    </View>
  );
}

export default Home;
