import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SearchBar, Icon, Button, Input} from 'react-native-elements';

import styles from './../css/Styles';

class Challenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      exercise: '',
      description: '',
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  componentDidMount() {
    var newState = {
      description: '',
      exercise: '',
    };

    if (this.props.route) {
      if (this.props.route.params.description) {
        newState.description = this.props.route.params.description;
      }

      if (this.props.route.params.exercise) {
        newState.exercise = this.props.route.params.exercise;
      }

      this.setState(newState);
    }
  };

  render() {
    const { navigation } = this.props;
    const { search } = this.state;

    return (
      <KeyboardAwareScrollView
      >
        <View style = {styles.container}>
        <SearchBar
        lightTheme
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
        placeholder="Search Friends..."
        onChangeText={this.updateSearch}
        value={search}
        />
          <View style={{marginTop:50, marginHorizontal: 10}}>

            <Text style={[styles.centerObject,styles.challengeFormLabel]}>Name of Exercise</Text>

            <TextInput
            placeholder="Exercise"
            style={styles.challengeFormInput}
            defaultValue={this.state.exercise}
            underlineColorAndroid = 'grey'
            onChangeText={e => this.setState({ exercise: e })}
            />
          </View>
          <View style={{marginVertical:30, marginHorizontal: 10}}>
            <Text style={[styles.centerObject,styles.challengeFormLabel]}>Distance/ Sets and Reps/ Time</Text>

            <TextInput
            placeholder="Description"
            style={styles.challengeFormInput}
            defaultValue={this.state.description}
            underlineColorAndroid = 'grey'
            onChangeText={d => this.setState({ description: d })}
            />

          </View>
          <View style={{marginVertical:60}}>
            <View style={styles.navButtons}>
              <View>
                <Button
                  title="Live"
                  buttonStyle={styles.challengeButton}
                  icon = {
                    <Icon
                      color='#666565'
                      iconStyle={styles.challengeIcons}
                      className="material-icons"
                      name="videocam"
                      size={25}
                    />
                  }
                  iconRight
                />
              </View>
              <View>
                <Button
                  title="Streak"
                  buttonStyle={styles.challengeButton}
                  icon = {
                    <Icon
                      color='#666565'
                      iconStyle={styles.challengeIcons}
                      className="material-icons"
                      name="thumb-up"
                      size={25}
                    />
                  }
                  iconRight
                />
              </View>
              <View>
                <Button
                  title="Battle"
                  buttonStyle={styles.challengeButton}
                  icon = {
                    <Icon
                      color='#666565'
                      iconStyle={styles.challengeIcons}
                      className="material-icons"
                      name="android"
                      size={25}
                    />
                  }
                  iconRight
                />
              </View>
            </View>

            <Button
            type="clear"
            icon = {
              <Icon
                color='#666565'
                reverse
                className="camera-button"
                name="camera-alt"
                size={40}
                onPress={() => navigation.navigate('Camera',
                  {
                    exercise: this.state.exercise,
                    description: this.state.description,
                  }
                )}
              />
            }
            />
          </View>
        </View>
        </KeyboardAwareScrollView>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <Challenge {...props} navigation={navigation} />;
}
