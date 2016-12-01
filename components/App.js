import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StackNavigation } from '@exponent/ex-navigation';
import Router from '../navigation/Router';
import Loader from '../components/Loader';
import LoginForm from '../components/LoginForm';
import { authActions } from '../state/actions';

class App extends React.Component {
  componentWillMount() {
    this.props.isLoggedIn();
  }

  render() {
    let initialRoute;

    if (this.props.auth.loggedIn) {
      initialRoute = Router.getRoute('friends');
    } else {
      initialRoute = Router.getRoute('auth');
    }

    if (this.props.auth.isLoading) {
      return <Loader />;
    }

    return (
      <StackNavigation
        id="root"
        initialRoute={initialRoute}
      />
    );
  }
}

App.propTypes = {
  auth: PropTypes.object,
  isLoggedIn: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth
});

const isLoggedIn = authActions.isLoggedIn;

export default connect(
  mapStateToProps,
  { isLoggedIn }
)(App);
