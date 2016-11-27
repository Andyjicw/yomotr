import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight,
         StyleSheet } from 'react-native';
import MontserratText from './MontserratText';

const OptionItem = props => (
  <View
    style={[styles.optionsContainer, { backgroundColor: props.backgroundColor }]}
    onPress={props.onPress}
  >
    <MontserratText style={[styles.option, { color: props.color }]}>
      {props.uppercase ? props.text.toUpperCase() : props.text}
    </MontserratText>
  </View>
);

OptionItem.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func,
  uppercase: PropTypes.bool,
  backgroundColor: PropTypes.string
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    padding: 6
  },

  option: {
    color: '#FFF',
    fontSize: 44,
    paddingLeft: 15
  }
});

export default OptionItem;
