import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
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
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      search: '',
      userid: '106063041617179551857',
    };
  }

  componentDidMount() {
    this._isMounted = true;
  	this.getFriends();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getFriends() {
      try {
        let response = await fetch(
          'https://fitshare-backend.herokuapp.com/friends/'.concat(this.state.userid)
        );
        let json = await response.json();
        console.log(json);
        // console.log(json[0]);
        // console.log(json[1]);
        this.setState({friends: json});
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

        <View style = {styles.container}>
          <Profile/>
        </View>

        <View style = {styles.container}>
          <SearchBar
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
          />
        </View>

        <View style = {styles.container}>
          <Challenge/>
        </View>

      </Swiper>
    );
  }
}
