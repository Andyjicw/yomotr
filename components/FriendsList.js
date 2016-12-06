import React, { PropTypes } from 'react';
import { View, SwipeableListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Prompt from 'react-native-prompt';
import Colors from '../constants/Colors';
import RowText from '../components/RowText';
import Layout from '../constants/Layout';
import { authActions } from '../state/actions';

class FriendsList extends React.Component {
  constructor() {
    super();

    const ds = SwipeableListView.getNewDataSource();

    this.state = {
      promptVisible: false,
      newFriend: '',
      dataSource: ds.cloneWithRowsAndSections(this._genDataSource()),
      rawDataSource: this._genDataSource()
    };

    this._sendYo = this._sendYo.bind(this);
    this._addFriend = this._addFriend.bind(this);
    this._openFriendForm = this._openFriendForm.bind(this);
  }

  _openFriendForm() {
    this.setState({ promptVisible: true });
  }

  _addFriend(friend) {
    this.setState({ promptVisible: false });
    // this.props.loadOnlineBoard(boardId);
    // this.props.navigator.push('board');
  }

  _sendYo(rowID) {
    const ds = SwipeableListView.getNewDataSource();
    const { rawDataSource } = this.state;
    const dataSource = {
      dataBlob: [],
      sectionIDs: [],
      rowIDs: []
    };

    dataSource.dataBlob = rawDataSource.dataBlob.map((row) => {
      const newRow = row;

      if (row.id === rowID && rowID !== 'addFriend') {
        newRow.loading = true;
      } else {
        delete newRow.loading;
      }

      return newRow;
    });

    this.setState({
      dataSource: ds.cloneWithRowsAndSections(dataSource),
      rawDataSource: dataSource
    });
  }

  _genDataSource() {
    const q = 5;
    let row;

    const dataSource = {
      dataBlob: [],
      sectionIDs: [],
      rowIDs: []
    };

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

    // friend rows
    for (let i = 0; i < q; i++) {
      row = {
        id: i,
        text: `friend #${i}`,
        backgroundColor: colorsOrder[i % colorsOrder.length]
      };

      dataSource.dataBlob.push(row);
    }

    // add friend row
    row = {
      id: 'addFriend',
      text: '+',
      backgroundColor: colorsOrder[q % colorsOrder.length]
    };

    dataSource.dataBlob.push(row);

    return dataSource;
  }

  _renderRow(rowData, sectionID, rowID, sendYo) {
    return (
      <RowText
        uppercase
        text={rowData.text}
        loading={rowData.loading}
        backgroundColor={rowData.backgroundColor}
        onPress={() => rowData.id === 'addFriend' ? this._openFriendForm() : sendYo(rowData.id)}
      />
    );
  }

  _renderQuickActions(rowData, sectionID, rowID) {
    if (rowData.id === 'addFriend') { return null; }

    return (
      <View style={styles.actionsContainer}>
        <RowText
          uppercase
          fontSize={'small'}
          text={'cancel'}
          backgroundColor={Colors.purple}
          onPress={() => {}}
        />
        <RowText
          uppercase
          fontSize={'small'}
          text={'delete'}
          backgroundColor={Colors.blue2}
          onPress={() => {}}
        />
        <RowText
          uppercase
          fontSize={'small'}
          text={'block'}
          backgroundColor={Colors.red}
          onPress={() => {}}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <SwipeableListView
          enableEmptySections
          dataSource={this.state.dataSource}
          maxSwipeDistance={Layout.window.width}
          renderQuickActions={this._renderQuickActions}
          renderRow={(...args) => this._renderRow(...args, this._sendYo)}
        />

        <Prompt
          title="Enter your friend username"
          placeholder="Friend username"
          submitText="Add friend"
          visible={this.state.promptVisible}
          defaultValue={this.state.newFriend}
          onChangeText={(text) => {
            if (this.state.newFriend.length <= 9) {
              this.setState({ newFriend: text.toUpperCase() });
            } else {
              this.setState({ newFriend: text.slice(0, 9) });
            }
          }}
          onCancel={() => this.setState({ promptVisible: false })}
          onSubmit={this._addFriend}
        />
      </View>
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
