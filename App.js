import React from 'react';
import { SafeAreaView } from 'react-native';

import { SearchBar, ListItem } from 'react-native-elements';

const users = [
  {
    name: 'jack',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'jackson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'jacklynn',
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
          subtitle={l.name}
          bottomDivider
        />
      ))}
    </SafeAreaView>
  );
};

export default App;
