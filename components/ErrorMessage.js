import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const ErrorMessage = props => (
  <View style={styles.container}>
    <Text style={styles.message}>
      {props.children}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red,
    borderRadius: 5,
    margin: 15,
    padding: 5
  },

  message: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700'
  }
});

export default ErrorMessage;
