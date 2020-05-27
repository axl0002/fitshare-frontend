import React from 'react';
import { SafeAreaView } from 'react-native';

import { SearchBar, ListItem, Button, Icon } from 'react-native-elements';

const users = [
  {
    name: 'jack',
    subtitle: 'New challenge!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'jackson',
    subtitle: 'Challenge accepted!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'jacklynn',
    subtitle: 'Challenge sent!',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];

const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <SearchBar placeholder="Type Here..." />
      {users.map((l, i) => (
        <ListItem
          key={i}
          leftAvatar={{ source: { uri: l.avatar } }}
          title={l.name}
          subtitle={l.subtitle}
          bottomDivider
        />
      ))}
    <Icon
      reverse
      className="profile-button"
      name="person"
      size={15}
    />
    <Icon
      reverse
      className="home-button"
      name="home"
      size={30}
    />
    <Icon
      reverse
      className="camera-button"
      name="camera-alt"
      size={15}
    />
    </SafeAreaView>
  );
};

export default App;
