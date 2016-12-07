import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from '@exponent/ex-navigation';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@exponent/vector-icons';
import Colors from '../constants/Colors';
import Router from '../navigation/Router';
import FriendsList from '../components/FriendsList';
import LoadingIndicator from '../components/LoadingIndicator';
import { friendsActions } from '../state/actions';

@withNavigation
class FriendsScreen extends React.Component {
  constructor(props) {
    super(props);

    this._goToProfile = this._goToProfile.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriends();
  }

  componentDidUpdate() {
    if (!this.props.auth.loggedIn) {
      this.props.navigator.immediatelyResetStack([Router.getRoute('auth', { cancelFetchLoginStatus: true })]);
    }
  }

  _goToProfile() {
    this.props.navigator.push('profile');
  }

  render() {
    return (
      <View style={styles.container}>
        <FriendsList
          items={this.props.friends.isFetching ? [] : this.props.friends.all}
          isSendingYo={this.props.friends.isSendingYo}
        />

        <ActionButton
          style={{ transform: [{ rotate: '50deg' }] }}
          buttonColor={Colors.red}
          icon={
            <Ionicons
              name={'ios-share-outline'}
              style={{ color: '#FFF', fontSize: 35 }}
            />
          } offsetX={15}
          offsetY={0}
          hideShadow
          onPress={this._goToProfile}
        />

        <LoadingIndicator
          visible={this.props.friends.isFetching || this.props.friends.isSendingYo}
          message={'Getting your friends...'}
          size={'large'}
        />
      </View>
    );
  }
}

FriendsScreen.route = {
  navigationBar: {
    visible: false
  },
  styles: {
    gestures: null
  }
};

FriendsScreen.propTypes = {
  auth: PropTypes.object,
  friends: PropTypes.object,
  fetchFriends: PropTypes.func,
  navigator: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  friends: state.friends
});

const { fetchFriends } = friendsActions;

export default connect(
  mapStateToProps,
  { fetchFriends }
)(FriendsScreen);
