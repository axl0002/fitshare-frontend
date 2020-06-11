import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Emoji from 'react-native-emoji';
import RNFetchBlob from 'react-native-fetch-blob';

import UserContext from '../context/UserContext';

import styles from './../css/Styles';
import sendStyles from './../css/SendScreenStyles';

export default class Send extends Component {

  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      friends: [],
      channels: [],
      exercise: this.props.route.params.exercise,
      description: this.props.route.params.description,
      challenge: this.props.route.params.challenge,
      uri: this.props.route.params.uri,
    };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    this.getFriends();
    this.getChannels();
  }

  // TODO: check metadata for null
  post() {
    let targetIds = this.state.friends.map(item => {return item.id;});
    RNFetchBlob.fetch('POST', 'https://fitshare-backend.herokuapp.com/send', {
      'Content-Type' : 'multipart/form-data',
    }, [
    { name : 'file', filename : 'file.mp4', data: RNFetchBlob.wrap(this.state.uri)},
    { name : 'json', data : JSON.stringify({
      user_id : this.context.id,
      targets_ids: targetIds,
      // metadata: 'Exercise: '.concat(this.state.exercise).concat(', Description: '.concat(this.state.description)),
      metadata: this.state.challenge,
    })},
    ]).then((resp) => {
      // ...
    }).catch((err) => {
      console.log('Error', err.message);
    });
   }

  getFriends() {
      fetch(
        'https://fitshare-backend.herokuapp.com/friends/'.concat(this.context.id)
      ).then((response) => {
        return response.json();
      }).then((json) => {
        let mapped = json.map(item => {
              item.avatar = 'https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320086059654790795.png';
              item.isSelect = false;
              item.selectedClass = sendStyles.list;
            return item;
        });
        this.setState({friends: mapped});
      });
  }

  getChannels() {
      fetch(
        'https://fitshare-backend.herokuapp.com/channels/'.concat(this.context.id)
      ).then((response) => {
        return response.json();
      }).then((json) => {
        let mapped = json.user_channels.map(item => {
            item.isSelect = false;
            item.selectedClass = sendStyles.list;
            return item;
        });
        this.setState({channels: mapped});
      });
  }

  updateSearch = search => {
    this.setState({ search });
  };

  selectFriend = data => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect ?
                  sendStyles.selected : sendStyles.list;
    const index = this.state.friends.findIndex(
      item => data.item.id === item.id
    );
    this.state.friends[index] = data.item;
    this.setState({
      friends: this.state.friends,
    });
    };

  selectChannel = data => {
    console.log(data);
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect ?
                  sendStyles.selected : sendStyles.list;
    const index = this.state.channels.findIndex(
      item => data.item.id === item.id
    );
    this.state.channels[index] = data.item;
    this.setState({
      channels: this.state.channels,
    });
  };

  send() {
    this.post();
    this.props.navigation.navigate(
      'Home'
    );
  }

  // renderRecent = data =>
  //   <TouchableOpacity
  //     style={[sendStyles.list, data.item.selectedClass]}
  //     onPress={() => this.selectRecent(data)}
  //   >
  //     <Image
  //       source={{ uri: data.item.avatar }}
  //       style={{ width: 40, height: 40, margin: 6 }}
  //     />
  //     <Text style={sendStyles.lightText}>  {data.item.name}  </Text>
  //   </TouchableOpacity>

  renderFriend = data =>
    <TouchableOpacity
      style={[sendStyles.list, data.item.selectedClass]}
      onPress={() => this.selectFriend(data)}
    >
      <Image
        source={{ uri: data.item.avatar }}
        style={{ width: 40, height: 40, margin: 6 }}
      />
      <Text style={sendStyles.lightText}>  {data.item.name}  </Text>
    </TouchableOpacity>

  renderChannel = data =>
    <TouchableOpacity
      style={[sendStyles.list, data.item.selectedClass]}
      onPress={() => this.selectChannel(data)}
    >
      <Emoji
        name={ data.item.avatar }
        style={{ width: 40, height: 40, margin: 6 }}
      />
      <Text style={sendStyles.lightText}>  {data.item.name}  </Text>
    </TouchableOpacity>

  render() {
    const itemNumber = this.state.friends.filter(item => item.isSelect).length +
                       this.state.channels.filter(item => item.isSelect).length;
    if (this.state.loading) {
      return (
        <View style={sendStyles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
    return (
      <View style={styles.container}>

        {/* <Text>{'Recents'}</Text>
        <FlatList
          data={
            this.state.friends
            .sort((a, b) => a.recentIndex > b.recentIndex)
            .filter(f => f.recentIndex < 3)
          }
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderFriend(item)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
          bottomDivider
        /> */}

        <Text>Friends</Text>
        <FlatList
          data={this.state.friends}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderFriend(item)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
          bottomDivider
        />
        <Text>Channels</Text>
        <FlatList
          data={this.state.channels}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderChannel(item)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
          bottomDivider
        />
        <View style={sendStyles.numberBox}>
          <Text style={sendStyles.number}>{itemNumber}</Text>
        </View>
        <TouchableOpacity style={ sendStyles.icon }>
          <View>
            <Icon
              raised
              name="send"
              type="font-awesome"
              color="#5eb2f7"
              size={30}
              onPress={() => this.send()}
              containerStyle={{ backgroundColor: '#FA7B5F' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}
