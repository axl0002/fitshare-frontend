// This is a send screen

import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";

import styles from './../css/Styles';

// isSelect and selectedClass will be added automatically
const users = [
  {
		id: 1,
    name: 'jack',
		avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
		isSelect: false,
		selectedClass: {
			paddingVertical: 5,
			margin: 3,
			flexDirection: "row",
			backgroundColor: "#fff",
			justifyContent: "flex-start",
			alignItems: "center",
			zIndex: -1
		},
  },
  {
		id: 2,
    name: 'jackson',
		avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
		isSelect: false,
		selectedClass: {
			paddingVertical: 5,
			margin: 3,
			flexDirection: "row",
			backgroundColor: "#fff",
			justifyContent: "flex-start",
			alignItems: "center",
			zIndex: -1
		},
  },
  {
		id: 3,
    name: 'jacklynn',
		avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
		isSelect: false,
		selectedClass: {
			paddingVertical: 5,
			margin: 3,
			flexDirection: "row",
			backgroundColor: "#fff",
			justifyContent: "flex-start",
			alignItems: "center",
			zIndex: -1
		},
  },
];

//TODO: fix styles
const custom_styles = StyleSheet.create({
	 name: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		marginBottom: 10
	},
	loader: {
		flex: 1, 
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff"
	},
	list: {
		paddingVertical: 5,
		margin: 3,
		flexDirection: "row",
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		alignItems: "center",
		zIndex: -1
	},
	lightText: {
		color: "#000",
		width: 200,
		paddingLeft: 15,
		fontSize: 12
	},
	icon: {
		position: "absolute",  
		bottom: 20,
		width: "100%", 
		left: 290, 
		zIndex: 1
	},
	numberBox: {
		position: "absolute",
		bottom: 75,
		width: 30,
		height: 30,
		borderRadius: 15,  
		left: 330,
		zIndex: 3,
		backgroundColor: "#e3e3e3",
		justifyContent: "center",
		alignItems: "center"
	},
	number: {fontSize: 14,color: "#000"},
	selected: {backgroundColor: "#628072"},
});

export default class Send extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			dataSource: users
		};
	}

	// /// loading the data
	// componentDidMount() {
	// 	this.fetchData();
	// }

	// fetchData = () => {
	// 	this.setState({
	// 		loading: false,
	// 		dataSource: users,
	// 	});
	// 	this.setState({loading: true});
	// 	fetch("url here")
	// 	.then(response => response.json())
	// 	.then(
	// 		responseJson => {
	// 		responseJson = users.map(item => {
	// 			item.isSelect = false;
	// 			item.selectedClass = custom_styles.list;
	// 		return item;
	// 	});
	// 	this.setState({
	// 		loading: false,
	// 		dataSource: responseJson,
	// 	});
	// 	}).catch(error => {this.setState({loading: false});
	// 	});
	// };

	selectItem = data => {
		data.item.isSelect = !data.item.isSelect;
		data.item.selectedClass = data.item.isSelect?
									custom_styles.selected: custom_styles.list;
		const index = this.state.dataSource.findIndex(
			item => data.item.id === item.id
		);
		this.state.dataSource[index] = data.item;
		this.setState({
			dataSource: this.state.dataSource,
		});
		};

	goToStore = () =>
		this.props.navigation.navigate(
			'Home' //, {selected: this.state.selected,}
		);

	renderItem = data =>
  <TouchableOpacity
    style={[custom_styles.list, data.item.selectedClass]}      
    onPress={() => this.selectItem(data)}
  >
		<Image
			source={{ uri: data.item.avatar }}
			style={{ width: 40, height: 40, margin: 6 }}
		/>
  	<Text style={custom_styles.lightText}>  {data.item.name}  </Text>
	</TouchableOpacity>
render() {
	const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;
	if (this.state.loading) {
		return (
			<View style={custom_styles.loader}>
				<ActivityIndicator size="large" color="black" />
			</View>
		);
	}
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.dataSource}
				ItemSeparatorComponent={this.FlatListItemSeparator}
				renderItem={item => this.renderItem(item)}
				keyExtractor={item => item.id.toString()}
				extraData={this.state}
				bottomDivider
				/>
				<View style={custom_styles.numberBox}>
				<Text style={custom_styles.number}>{itemNumber}</Text>
			</View>
				<TouchableOpacity style={custom_styles.icon}>
					<View>
						<Icon
							raised
							name="send"
							type="font-awesome"
							color="#5eb2f7" 
							size={30} 
							onPress={() => this.goToStore()}
							containerStyle={{ backgroundColor: "#FA7B5F" }}
						/>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

} //Send