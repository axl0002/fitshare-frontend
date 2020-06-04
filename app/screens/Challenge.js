import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SearchBar, Icon, Button, Input } from 'react-native-elements';

import styles from './../css/Styles';

class Challenge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      exercise: null,
      description: null,
    };
  }

  updateSearch = search => {
    this.setState({ search });
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
          <View style={{marginTop:50}}>
            <View style = {styles.centerObject}>
              <Text style={styles.challengeFormText}>Name of Exercise</Text>
            </View>
            <Input placeholder="Exercise"
            onChangeText={e => this.setState({ exercise: e })}
            />
          </View>
          <View style={{marginVertical:20}}>
            <View style = {styles.centerObject}>
              <Text style={styles.challengeFormText}>Distance/ Sets and Reps/ Time</Text>
            </View>
            <Input
            placeholder="Description"
            onChangeText={d => this.setState({ description: d })}
            />
          </View>
          <View style={styles.bottom}>
            <View style={styles.navButtons}>
              <View>
                <Button
                  title="Live"
                  buttonStyle={styles.challengeButton}
                  icon = {
                    <Icon
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
