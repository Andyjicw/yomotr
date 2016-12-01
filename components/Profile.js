import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import RowText from '../components/RowText';
import Layout from '../constants/Layout';
import { authActions } from '../state/actions';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
  }

  _logout() {
    this.props.logout();
  }

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
      { text: 'user: me', uppercase: true, fontSize: 'medium', onPress: () => {} },
      { text: 'edit profile', uppercase: true, onPress: () => {} },
      { text: 'yo count: 24', uppercase: true, onPress: () => {} },
      { text: 'logout', uppercase: true, onPress: this._logout }
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
        uppercase={rowData.uppercase}
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
  logout: PropTypes.func
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row'
  }
});

const logout = authActions.logout;

export default connect(
  null,
  { logout }
)(FriendsList);
