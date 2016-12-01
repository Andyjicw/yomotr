import React, { PropTypes } from 'react';
import { View, Text, TextInput, TouchableOpacity,
         StyleSheet } from 'react-native';
import { Font } from 'exponent';
import Colors from '../constants/Colors';

const fontSizes = {
  big: 44,
  medium: 38,
  small: 26
};

class RowInput extends React.Component {
  render() {
    const selectedColor = this.props.color || '#FFF';
    const selectedFontSize = this.props.fontSize || 'big';

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.inputContainer, { backgroundColor: this.props.backgroundColor }]}
        onPress={this.props.onPress}
      >
        <TextInput
          style={[
            styles.input, {
              // ...Font.style('montserrat'),
              color: selectedColor,
              fontSize: fontSizes[selectedFontSize],
              lineHeight: fontSizes[selectedFontSize] + 5
            }
          ]}
          editable
          autoCorrect={false}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
          autoCapitalize={this.props.autoCapitalize || 'none'}
          secureTextEntry={this.props.secureTextEntry}
        />
      </TouchableOpacity>
    );
  }
}

RowInput.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
  fontSize: PropTypes.string,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  backgroundColor: PropTypes.string
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    padding: 6
  },

  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20
  }
});

export default RowInput;
