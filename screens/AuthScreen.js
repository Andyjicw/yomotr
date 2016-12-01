import React, { PropTypes } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationStyles } from '@exponent/ex-navigation';
import Colors from '../constants/Colors';
import RowTextList from '../components/RowTextList';

import { authActions } from '../state/actions';

@withNavigation
class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this._goToLoginScreen = this._goToLoginScreen.bind(this);
    this._goToSignupScreen = this._goToSignupScreen.bind(this);
  }

  _goToLoginScreen() {
    this.props.navigator.push('login');
  }

  _goToSignupScreen() {
    this.props.navigator.push('signup');
  }

  render() {
    const links = [
      { text: '✨ YOmotr ✨' },
      { text: 'login', uppercase: true, onPress: this._goToLoginScreen },
      { text: 'signup', uppercase: true, onPress: this._goToSignupScreen }
    ];

    return (
      <ScrollView style={styles.container}>
        <RowTextList list={links} />
      </ScrollView>
    );
  }
}

AuthScreen.route = {
  navigationBar: {
    visible: false
  }
};

AuthScreen.propTypes = {
  logout: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple }
});

const logout = authActions.logout;

export default connect(
  null,
  { logout }
)(AuthScreen);
