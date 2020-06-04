import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Profile from './Profile';
import Challenge from './Challenge';
import { SearchBar, ListItem, Icon, Button} from 'react-native-elements';

import { GoogleSignin } from '@react-native-community/google-signin';
import styles from './../css/Styles';

import UserContext from '../context/UserContext';


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
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      search: '',
      email: null,
      add: false,
    };
  }

  componentDidMount() {
    this.getFriends();
  }

  async getFriends() {
    await fetch(
      'https://fitshare-backend.herokuapp.com/friends/'.concat(this.context.id)
    ).then((response) => response.json())
     .then((json) => {
        this.setState({friends: json});
    });
  }

  addFriends(email) {
    console.log('send')
    console.log(email)
    fetch('https://fitshare-backend.herokuapp.com/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                source_id: this.context.id,
                target_email: email,
            }),
    }
    );
    console.log(this.context.id);
  }

  updateSearch = search => {
    this.setState({ search });
    // console.log(search)
  };

  add(email)  {
    this.addFriends(email)

  };

  renderSeparator = () => (
  <View
    style={{
      backgroundColor: '#c7c7c7',
      width: "100%",
      height: 1,
    }}
  />
);

  render() {
    const { search } = this.state;

    let button = (
    <TouchableOpacity
      onPress={this.add(search)}
      style={styles.searchBarButton}
    >
      <Text style={{ fontSize: 14 }}> ADD </Text>
    </TouchableOpacity>
    );

    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={1}
        showsButtons={true}>

        <View style = {[styles.backgroundColoring, styles.container]}>
          <Profile/>
        </View>

        <View style = {[styles.whiteBackgroundColoring, styles.container]}>
          <View style={styles.searchBarLayer}>
            <View style={{flex: 1}}>
              <SearchBar
              lightTheme
              round
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={styles.searchBarInput}
              placeholder="Search Friends..."
              onChangeText={this.updateSearch}
              value={search}
              />
            </View>
            <View>
            <Button
            type='clear'
            icon = {
              <Icon

                className="material-icons"
                name="person-add"
                size={40}
                onPress={() => this.add(search)}
              />
            }
            />
            </View>
          </View>

          <FlatList
            ItemSeparatorComponent={this.FlatListItemSeparator}
            data={this.state.friends}
            renderItem={item => (
              <TouchableOpacity>
                <Image
                  source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg' }}
                  style={{ width: 40, height: 40, margin: 6 }}
                />
                <Text>  {item.item.name}  </Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index.toString()}
            bottomDivider
          />

        </View>

        <View style = {[styles.whiteBackgroundColoring, styles.container]}>
          <Challenge/>
        </View>

      </Swiper>
    );
  }
}
