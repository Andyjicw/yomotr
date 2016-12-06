import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from '@exponent/ex-navigation';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@exponent/vector-icons';
import Colors from '../constants/Colors';
import Router from '../navigation/Router';
import FriendsList from '../components/FriendsList';

@withNavigation
class FriendsScreen extends React.Component {
  constructor(props) {
    super(props);

    this._goToProfile = this._goToProfile.bind(this);
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
        <FriendsList />

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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(FriendsScreen);
