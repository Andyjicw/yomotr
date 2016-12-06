import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationStyles } from '@exponent/ex-navigation';
import Colors from '../constants/Colors';
import Router from '../navigation/Router';
import RowTextList from '../components/RowTextList';
import LoadingIndicator from '../components/LoadingIndicator';
import { authActions } from '../state/actions';

@withNavigation
class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this._goToLoginScreen = this._goToLoginScreen.bind(this);
    this._goToSignupScreen = this._goToSignupScreen.bind(this);
  }

  componentDidMount() {
    if (!this.props.route.params.cancelFetchLoginStatus) {
      this.props.isLoggedIn();
    }

    switch (this.props.auth.errorType) {
      case 'login':
        return this._goToLoginScreen();
      case 'signup':
        return this._goToSignupScreen();
      default:
        return () => {};
    }
  }

  componentDidUpdate() {
    if (this.props.auth.loggedIn) {
      this.props.navigator.immediatelyResetStack([Router.getRoute('friends')]);
    }
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
      <View style={styles.container}>
        <ScrollView>
          <RowTextList list={links} />
        </ScrollView>

        <LoadingIndicator
          visible={this.props.auth.isLoading}
          message={'Just a moment...'}
          size={'large'}
        />
      </View>
    );
  }
}

AuthScreen.route = {
  navigationBar: {
    visible: false
  },
  styles: {
    ...NavigationStyles.none,
    gestures: null
  }
};

AuthScreen.propTypes = {
  auth: PropTypes.object,
  route: PropTypes.object,
  isLoggedIn: PropTypes.func,
  navigator: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

const isLoggedIn = authActions.isLoggedIn;

export default connect(
  mapStateToProps,
  { isLoggedIn }
)(AuthScreen);
