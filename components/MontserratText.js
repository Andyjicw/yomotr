import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { Font } from 'exponent';

const MontserratText = props => (
  <Text
    ellipsizeMode={'tail'}
    style={[props.style, Font.style('montserrat')]}
  >
    {props.children}
  </Text>
);

MontserratText.propTypes = {
  style: PropTypes.any,
  adjust: PropTypes.bool,
  children: PropTypes.string.isRequired
};

export default MontserratText;
