import React, { PropTypes } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import RowText from '../components/RowText';
import { authActions } from '../state/actions';

class LoginForm extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <RowText
          text={'username'}
          color={'#FFF'}
          backgroundColor={Colors.green2}
          onPress={() => {}}
        />
        <RowText
          text={'password'}
          color={'#FFF'}
          backgroundColor={Colors.yellow}
          onPress={() => {}}
        />
      </ScrollView>
    );
  }
}

LoginForm.propTypes = {
  loginGoogle: PropTypes.func,
  loginFacebook: PropTypes.func
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

const loginGoogle = authActions.loginGoogle;
const loginFacebook = authActions.loginFacebook;

export default connect(
  null,
  { loginGoogle, loginFacebook }
)(LoginForm);
