import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import RowText from '../components/RowText';
import Layout from '../constants/Layout';
import { authActions } from '../state/actions';

class FriendsList extends React.Component {
  _makeProfile() {
    const colorsOrder = [
      Colors.green2,
      Colors.green1,
      Colors.blue1,
      Colors.blue3,
      Colors.green3,
      Colors.yellow,
      Colors.blue2,
      Colors.purple
    ];

    const links = [
      { text: 'user: me', fontSize: 'medium', onPress: () => {} },
      { text: 'invite', onPress: () => {} },
      { text: 'find friends', onPress: () => {} },
      { text: 'index', onPress: () => {} },
      { text: 'edit profile', onPress: () => {} },
      { text: 'what is yo?', onPress: () => {} },
      { text: 'unblock', onPress: () => {} },
      { text: 'yo count: 24', onPress: () => {} },
      { text: 'edit account', onPress: () => {} },
      { text: 'feedback', onPress: () => {} },
      { text: '+', onPress: () => {} },
      { text: 'logout', onPress: () => {} }
    ];

    return links.map((item, index) => {
      const link = item;
      link.backgroundColor = colorsOrder[index % colorsOrder.length];

      return this._renderRow(link);
    });
  }

  _renderRow(rowData) {
    return (
      <RowText
        key={rowData.text}
        uppercase
        text={rowData.text}
        fontSize={rowData.fontSize}
        backgroundColor={rowData.backgroundColor}
        onPress={rowData.onPress}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        {this._makeProfile()}
      </ScrollView>
    );
  }
}

FriendsList.propTypes = {
  loginGoogle: PropTypes.func,
  loginFacebook: PropTypes.func
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row'
  }
});

const loginGoogle = authActions.loginGoogle;
const loginFacebook = authActions.loginFacebook;

export default connect(
  null,
  { loginGoogle, loginFacebook }
)(FriendsList);
