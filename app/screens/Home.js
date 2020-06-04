import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Profile from './Profile';
import Challenge from './Challenge';
import { SearchBar, Button } from 'react-native-elements';

import styles from './../css/Styles';

import UserContext from '../context/UserContext';


export default class Home extends Component {
  static contextType = UserContext;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      search: '',
      url: null,
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

  updateSearch = search => {
    this.setState({ search });
  };

  open() {
    let url = this.fetchVideo();
    this.props.navigation.navigate(
      'Receive',
      {
        metadata: 'RANDOM', //Change later
        description: 'https://fitshare-app.s3.eu-west-2.amazonaws.com/5',
      }
     );
  }

  fetchVideo() {
    //backend endpoint
  }

  renderSeparator = () => (
  <View
    style={{
      backgroundColor: '#c7c7c7',
      width: '100%',
      height: 1,
    }}
  />
);

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

        <View style = {[styles.whiteBackgroundColoring, styles.container]}>
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
                <Text>  {item.item.name}  </Text>
                <Button
                  title='open'
                  onPress={() => 
                    this.open()
                  }
                  >
                </Button>
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
