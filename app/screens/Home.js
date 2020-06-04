import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, FlatList, TouchableOpacity, Image, Modal, RefreshControl } from 'react-native';
import Profile from './Profile';
import Challenge from './Challenge';
import { SearchBar, Icon, Button, Avatar } from 'react-native-elements';

import styles from './../css/Styles';

import UserContext from '../context/UserContext';


export default class Home extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      search: '',
      email: null,
      add: false,
      refreshing: true,
      modalVisible: false,
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
        this.setState({friends: json, refreshing: false,});
    });
  }

  async addFriends(email) {
    let response = await fetch('https://fitshare-backend.herokuapp.com/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                source_id: this.context.id,
                target_email: email,
            }),
    }
  ).then(resp => ({ status: resp.status}));

    if(response.status == 400) {
      this.setState({modalVisible: true})
    } else {
    }
  }

  updateSearch = search => {
    this.setState({ search });
  };

  onRefresh() {
    //Clear old data of the list
    this.setState({ friends: [] });
    //Call the Service to get the latest data
    this.getFriends();
  }

  closeModal() {
    setTimeout(() => {
      this.setState({modalVisible: false})
    }, 1000);
  }

  open(targetid) {
    try {
      fetch(
        'https://fitshare-backend.herokuapp.com/open/'.concat(targetid).concat('/').concat(this.context.id)
      ).then(response => response.json())
       .then((json) => {
          let metadata = json.metadata;
          let key = json.key;
          this.props.navigation.navigate(
            'Receive',
            {
              metadata: metadata,
              s3key: key,
            }
           );
      });
    } catch (error) {
      console.error(error);
    }
  }

  add(email)  {
    this.addFriends(email);
    this.getFriends();
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
            type="clear"
            icon = {
              <Icon
                color= '#666565'
                className="material-icons"
                name="person-add"
                size={40}
                onPress={() => this.add(search)}
              />
            }
            />
            </View>
          </View>

          <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onShow={() => this.closeModal()}
          >
            <View style = {{flexDirection: 'row', justifyContent: 'center', backgroundColor: 'red'}}>
              <Text> Not valid email </Text>
            </View>
          </Modal>
          </View>

          <FlatList
            data={this.state.friends}
            renderItem={item => (
              <TouchableOpacity onPress={() => this.open(item.item.id)}>
                <View style = {{ flex: 1, flexDirection: 'row'}}>
                <View>
                  <Avatar
                    rounded
                    style={{ width: 50, height: 50, margin: 6 }}
                    source={{
                      uri:'https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320086059654790795.png',
                    }}
                    />
                </View>
                <View style = {{justifyContent: 'center'}}>
                  <Text>  {item.item.name}  </Text>
                  <Text>  Tap on me  </Text>
                </View>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index.toString()}
            bottomDivider
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
          <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{ color: '#666565'}}> Swipe down to refresh </Text>
          </View>
        </View>

        <View style = {[styles.whiteBackgroundColoring, styles.container]}>
          <Challenge/>
        </View>

      </Swiper>
    );
  }
}
