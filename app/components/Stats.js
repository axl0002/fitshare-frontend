import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ListItem } from 'react-native-elements';
import UserContext from '../context/UserContext';



import styles from './../css/Styles';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }


  render() {
    console.log(this.props);
    if (Object.keys(this.props.data).length === 0) {
      return (<View/>);
    } else {
      const line = {
        labels: Object.keys(this.props.data),
        datasets: [
          {
            data: Object.values(this.props.data),
            strokeWidth: 2,
          },
        ],
      };

      return (
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
      );
    }
  }
}

export default class Profile extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
       isReady: false,
    };
  }

  render() {
    if (this.state.isReady){
      return (
      <View>
          <View style={styles.roundedCorners}>
            <ListItem
                key="1"
                title="Challenges completed:"
                subtitle={this.state.challengesDone}
                bottomDivider
            />
            <ListItem
                key="2"
                title="Challenges sent:"
                subtitle={this.state.challengesSent}
            />
          </View>
          <Chart data={this.state.challengesByDay}/>
      </View>
    );
    } else {
      fetch(
        'https://fitshare-backend.herokuapp.com/data/'.concat(this.context.id)
      ).then((response) => response.json())
       .then((json) => {
         console.log(this.state);
         this.setState(json);
         this.setState({isReady: true});
      });
      return (<View/>);
    }
  }
}

