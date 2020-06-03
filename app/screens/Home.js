import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Profile from './Profile';
import Challenge from './Challenge';
import { SearchBar, ListItem, Icon, Button} from 'react-native-elements';

import { GoogleSignin } from '@react-native-community/google-signin';
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
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      search: '',
      userid: null,
      data: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.load();

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async load() {
    await this.getCurrentUserInfo();
    await this.getFriends();

  }

  async getFriends() {
      try {
        let response = await fetch(
          'https://fitshare-backend.herokuapp.com/friends/'.concat(this.state.userid)
        );
        let json = await response.json();
        this.setState({friends: json});
      } catch (error) {
        console.error(error);
      }
    }

    async getCurrentUserInfo() {
        try {
            let currentUser = await GoogleSignin.getCurrentUser();
            this.setState({ data: currentUser });
            let id = currentUser['user']['id'];
            this.setState({ userid: id });
          } catch (error) {
            console.error(error);

          }
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
          <FlatList
            ItemSeparatorComponent={this.FlatListItemSeparator}
            data={this.state.friends}
            renderItem={item => (
              <TouchableOpacity>
                <Image
                  source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg' }}
                  style={{ width: 40, height: 40, margin: 6 }}
                />
                <Text>  {item.item}  </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            bottomDivider
          />

        </View>

        <View style = {[styles.backgroundColoring, styles.container]}>
          <Challenge/>
        </View>

      </Swiper>
    );
  }
}
