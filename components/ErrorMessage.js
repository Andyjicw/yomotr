import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const ErrorMessage = props => (
  <View style={styles.container}>
    <Text style={styles.message}>
      {props.children}
    </Text>
  </View>
);

ErrorMessage.propTypes = {
  children: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red,
    borderRadius: 5,
    margin: 15,
    padding: 8
  },

  message: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700'
  }
});

export default ErrorMessage;
