import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, } from 'react-native';
import Emoji from 'react-native-emoji';

import UserContext from '../context/UserContext';

import styles from './../css/Styles';

export default class Channels extends Component {

	static contextType = UserContext;
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			myChannels: null,
			popularChannels: null,
		};
	}

	componentDidMount() {
		this.getChannels();
		this.getPopularChannels();
	}
	
	async getChannels() {
    await fetch(
      'https://fitshare-backend.herokuapp.com/channels/'.concat(this.context.id)
    ).then((response) => response.json())
     .then((json) => {
        this.setState({myChannels: json});
    });
	}
	
	async getPopularChannels() {
    await fetch(
      'https://fitshare-backend.herokuapp.com/channels/popular'
    ).then((response) => response.json())
     .then((json) => {
        this.setState({popularChannels: json});
    });
  }

	updateSearch = search => {
    this.setState({ search });
	};

	// TODO: store emojies in DB?
	renderChannel = data =>
    <TouchableOpacity>
      <Emoji name="first_place_medal" style={{fontSize: 15}} />
      <Text>  {data.item.name}  </Text>
			<Text>  {data.item.description}  </Text>
			<Text>  {data.item.count}  </Text>
    </TouchableOpacity>
	
	render() {
		return (
		<ScrollView style = {styles.container}>
			<View>
				<Text>{'My channels'}</Text>
					<FlatList
            data={this.state.myChannels}
            renderItem={item => this.renderChannel(item)}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index.toString()}
            bottomDivider
          />
				<Text>{'Popular channels'}</Text>
					<FlatList
            data={this.state.popularChannels}
            renderItem={item => this.renderChannel(item)}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index.toString()}
            bottomDivider
          />
			</View>
		</ScrollView>);
	}

}
