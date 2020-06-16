import React, { Component } from 'react';
import { Icon, Button } from 'react-native-elements';
import UserContext from '../context/UserContext';


class AddFriendButton extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
  }

  addFriends() {
    fetch('https://fitshare-backend.herokuapp.com/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                source_id: this.context.id,
                target_email: this.props.search,
            }),
    }).then((response) => response.json())
      .then((json) => {
        this.props.friends = json;
    });
  }

  render () {
    const icon = (
            <Icon
              className="material-icons"
              name="person-add"
              size={40}
            />);

    return (
        <Button
        type="clear"
        icon = { icon }
        onPress={ this.addFriends }
        />);
  }
}

export default AddFriendButton;
