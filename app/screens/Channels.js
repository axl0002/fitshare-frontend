import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Modal, } from 'react-native';
import Emoji from 'react-native-emoji';

import UserContext from '../context/UserContext';

import styles from './../css/Styles';

export default class Channels extends Component {

	static contextType = UserContext;
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			channels: [],
			modalVisible: false,
		};
	}

	componentDidMount() {
		this.getChannels();
	}
	
	async getChannels() {
    await fetch(
      'https://fitshare-backend.herokuapp.com/channels/'.concat(this.context.id)
    ).then((response) => response.json())
     .then((json) => {
        this.setState({channels: json,});
    });
	}
	
	async joinChannel(groupId) {
    let response = await fetch('https://fitshare-backend.herokuapp.com/join', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                userid: this.context.id,
                groupid: groupId,
            }),
    }
  ).then(resp => ({ status: resp.status}));

    if(response.status != 201) {
			this.setState({modalVisible: true,})
		}
	}
	
	async leaveChannel(groupId) {
    let response = await fetch('https://fitshare-backend.herokuapp.com/leave', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                userid: this.context.id,
                groupid: groupId,
            }),
    }
  ).then(resp => ({ status: resp.status}));

    if(response.status != 204) {
			this.setState({modalVisible: true,})
		}
  }

	updateSearch = search => {
    this.setState({ search });
	};

	renderSeparator = () => (
		<View
			style={{
				backgroundColor: '#c7c7c7',
				width: '100%',
				height: 1,
			}}
		/>
	);

	noUserChannels = () => {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}> You have no channel subscriptions </Text>
      </View>
		);};
		
	noPopularChannels = () => {
		return (
			<View style={styles.MainContainer}>
				<Text style={{ textAlign: 'center' }}> There are no other channels currently available </Text>
			</View>
		);};

	renderOtherChannel = data =>
    <TouchableOpacity>
			<View style = {{ flex: 1, flexDirection: 'row'}}>
				<Emoji name={data.item.avatar} style={{fontSize: 15}} />
				<View style = {{ flex: 1, flexDirection: 'column'}}>
					<Text>  {data.item.name}  </Text>
					<Text style={styles.friendTextStyle}> {data.item.description}  </Text>
					<Text style={styles.friendTextStyle}> Members: {data.item.count}  </Text>
				</View>
				<View style={{margin:10}}>
					<Button
						title='Join'
						color='green'
						buttonStyle={styles.challengeButton}
						onPress={() => {this.joinChannel(data.item.id)	}}/>
				</View>
      </View>
    </TouchableOpacity>

	renderUserChannel = data =>
    <TouchableOpacity>
			<View style = {{ flex: 1, flexDirection: 'row'}}>
				<Emoji name={data.item.avatar} style={{fontSize: 15}} />
				<View style = {{ flex: 1, flexDirection: 'column'}}>
					<Text>  {data.item.name}  </Text>
					<Text style={styles.friendTextStyle}> {data.item.description}  </Text>
					<Text style={styles.friendTextStyle}> Members: {data.item.count}  </Text>
				</View>
				<View style={{margin:10}}>
					<Button
						title='Leave'
						color='red'
						buttonStyle={styles.challengeButton}
						onPress={() => {this.leaveChannel(data.item.id)	}}/>
				</View>
      </View>
    </TouchableOpacity>
	
	render() {
		return (
			<View style = {[styles.whiteBackgroundColoring, styles.container]}>
			<View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
					onShow={() => this.closeModal()}
				>
					<View style = {{flexDirection: 'row', justifyContent: 'center', backgroundColor: 'red'}}>
						<Text> Looks like something went wrong </Text>
					</View>
				</Modal>
				</View>
			<View>
			<Text style={[styles.centerObject,styles.challengeFormLabel]}> My channels </Text>
					<FlatList
            data={this.state.channels.user_channels}
            renderItem={item => this.renderUserChannel(item)}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index.toString()}
						bottomDivider
						ListEmptyComponent={this.noUserChannels()}
          />
				<Text></Text>
				<Text style={[styles.centerObject,styles.challengeFormLabel]}> Popular channels </Text>
					<FlatList
            data={this.state.channels.other}
            renderItem={item => this.renderOtherChannel(item)}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index.toString()}
						bottomDivider
						ListEmptyComponent={this.noPopularChannels()}
          />
			</View>
			</View>
			);
	}

}
