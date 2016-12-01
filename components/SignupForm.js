import React, { PropTypes } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationStyles } from '@exponent/ex-navigation';
import Colors from '../constants/Colors';
import RowText from '../components/RowText';
import RowInput from '../components/RowInput';
import ErrorMessage from '../components/ErrorMessage';
import { authActions } from '../state/actions';

@withNavigation
class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this._signup = this._signup.bind(this);
    this._goBack = this._goBack.bind(this);
  }

  _signup() {
    const { username, password } = this.state;

    if (username.length && password.length) {
      this.props.signup(username, password);
    }
  }

  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ErrorMessage>Error message example</ErrorMessage>

        <RowInput
          color={'#FFF'}
          maxLength={10}
          placeholder={'username'}
          autoCapitalize={'characters'}
          backgroundColor={Colors.yellow}
          onChangeText={username => this.setState({ username })}
        />
        <RowInput
          color={'#FFF'}
          maxLength={10}
          secureTextEntry
          placeholder={'password'}
          keyboardType={'numeric'}
          backgroundColor={Colors.green2}
          onChangeText={password => this.setState({ password })}
        />
        <RowText
          uppercase
          text={'signup!'}
          color={'#FFF'}
          backgroundColor={Colors.red}
          onPress={this._signup}
        />
        <RowText
          uppercase
          text={'go back'}
          color={'#FFF'}
          backgroundColor={Colors.blue3}
          onPress={this._goBack}
        />
      </ScrollView>
    );
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple
  },

  titleContainer: {
    alignItems: 'center',
    marginTop: 60
  },

  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 54,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 8
  },

  inputsContainer: {
    alignItems: 'center',
    marginTop: 20
  },

  textInput: {
    backgroundColor: Colors.rmotrB300,
    height: 40,
    fontSize: 14,
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },

  mainButtonsContainer: {
    alignItems: 'stretch',
    marginTop: 20
  },

  separatorContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    margin: 5
  },

  separator: {
    color: '#DDD',
    fontSize: 13,
    marginBottom: 5
  },

  mainButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 40,
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1
  },

  mainButtonText: {
    color: '#FFF',
    fontWeight: '700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 1
  },

  footerButtonsContainer: {
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20
  },

  footerButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 30,
    borderRadius: 3,
    padding: 6,
    margin: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },

  footerButtonTouchable: {
    flex: 0.5
  },

  footerButtonText: {
    color: '#DDD',
    fontSize: 12,
    fontWeight: '500'
  }
});

const signup = authActions.signup;

export default connect(
  null,
  { signup }
)(SignupForm);
