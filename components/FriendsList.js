import React, { PropTypes } from 'react';
import { View, SwipeableListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Prompt from 'react-native-prompt';
import Colors from '../constants/Colors';
import RowText from '../components/RowText';
import Layout from '../constants/Layout';
import { friendActions, friendsActions } from '../state/actions';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    const ds = SwipeableListView.getNewDataSource();

    this.state = {
      promptVisible: false,
      dataSource: ds.cloneWithRowsAndSections(this._genDataSource(this.props.items)),
      rawDataSource: this._genDataSource(this.props.items)
    };

    this._sendYo = this._sendYo.bind(this);
    this._addFriend = this._addFriend.bind(this);
    this._setFriendUser = this._setFriendUser.bind(this);
    this._genDataSource = this._genDataSource.bind(this);
    this._openFriendForm = this._openFriendForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isSendingYo) {
      const ds = SwipeableListView.getNewDataSource();
      const newDataSource = this._genDataSource(nextProps.items);

      this.setState({
        dataSource: ds.cloneWithRowsAndSections(newDataSource),
        rawDataSource: newDataSource
      });
    }
  }

  _openFriendForm() {
    this.setState({ promptVisible: true });
  }

  _setFriendUser(user) {
    this.props.setFriendUser(user);
  }

  _addFriend(friend) {
    this.setState({ promptVisible: false });
    this.props.addFriend(friend);
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

    this.props.sendYo(this.props.items[rowID]);
  }

  _genDataSource(data) {
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
    data.forEach((friend, i) => {
      row = {
        id: i,
        text: friend,
        loading: false,
        backgroundColor: colorsOrder[i % colorsOrder.length]
      };

      dataSource.dataBlob.push(row);
    });

    // add friend row
    row = {
      id: 'addFriend',
      text: '+',
      backgroundColor: colorsOrder[data.length % colorsOrder.length]
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
      <View style={styles.container}>
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
          defaultValue={this.props.friend.username}
          onChangeText={(text) => {
            if (this.props.friend.username.length <= 9) {
              this._setFriendUser(text.toUpperCase());
            } else {
              this._setFriendUser(text.slice(0, 9));
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
  items: PropTypes.array,
  friend: PropTypes.object,
  sendYo: PropTypes.func,
  addFriend: PropTypes.func,
  isSendingYo: PropTypes.bool,
  setFriendUser: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  actionsContainer: {
    flexDirection: 'row'
  }
});

const mapStateToProps = state => ({
  friend: state.friend
});

const addFriend = friendActions.addFriend;
const setFriendUser = friendActions.setFriendUser;
const sendYo = friendsActions.sendYo;

export default connect(
  mapStateToProps,
  { addFriend, setFriendUser, sendYo }
)(FriendsList);
