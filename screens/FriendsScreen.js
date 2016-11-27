import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationStyles } from '@exponent/ex-navigation';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@exponent/vector-icons';
import Colors from '../constants/Colors';
import FriendsList from '../components/FriendsList';
import { authActions } from '../state/actions';

@withNavigation
class FriendsScreen extends React.Component {
  constructor(props) {
    super(props);

    this._goToProfile = this._goToProfile.bind(this);
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
              style={{ color: '#FFF', fontSize: 35, transform: [{ rotate: '90deg' }] }}
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
  }
};

FriendsScreen.propTypes = {
  logout: PropTypes.func
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

const logout = authActions.logout;

export default connect(
  null,
  { logout }
)(FriendsScreen);
