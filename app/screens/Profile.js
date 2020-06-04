import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import UserContext from '../context/UserContext';

import { SearchBar, ListItem, Avatar } from 'react-native-elements';

import styles from './../css/Styles';

const stats = [
  {
    icon: 'http://www.clipartbest.com/cliparts/9TR/n4x/9TRn4xqTe.png',
    name: 'longest streak',
    value: '36',
  },
  {
    icon: 'http://www.clipartbest.com/cliparts/9TR/n4x/9TRn4xqTe.png',
    name: 'challenge sent',
    value: '50',
  },
  {
    icon: 'http://www.clipartbest.com/cliparts/9TR/n4x/9TRn4xqTe.png',
    name: 'challenges received',
    value: '44',
  },  {
      icon: 'http://www.clipartbest.com/cliparts/9TR/n4x/9TRn4xqTe.png',
      name: 'challenges completed',
      value: '97%',
    },
];

export default class Profile extends Component {
  static contextType = UserContext;

  state = {
    search: '',
  }

  updateSearch = search => {
    this.setState({ search });
  };


  render() {
    const { search } = this.state;
    const line = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          strokeWidth: 2, // optional
        },
      ],
    };

    return (
      <ScrollView style = {styles.container}>
      <SearchBar
      lightTheme
      containerStyle={styles.searchBarContainer}
      inputContainerStyle={styles.searchBarInput}
      placeholder="Search Friends..."
      onChangeText={this.updateSearch}
      value={search}
      />
        <View style = {styles.centerObject}>
          <View style = {styles.profileAvatar}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri:'https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320086059654790795.png',
              }}
              />
            </View>
            <View style={{margin:20}}>
              <Text style={styles.profileText}>
                {this.context.name}
              </Text>
            </View>
          </View>
          <View style={styles.roundedCorners}>
            {stats.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.icon } }}
                title={l.name}
                subtitle={l.value}
                bottomDivider
              />
            ))}
          </View>
          <View style = {{marginTop: 25}}>
          <LineChart
            data={line}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
          />
        </View>
      </ScrollView>
    );
  }
}
