import React, { PropTypes } from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import MontserratText from './MontserratText';

const fontSizes = {
  big: 44,
  medium: 38,
  small: 26
};

class RowText extends React.Component {
  render() {
    const selectedColor = this.props.color || '#FFF';
    const selectedFontSize = this.props.fontSize || 'big';
    let content;

    if (this.props.loading) {
      content = (
        <ActivityIndicator
          size={'large'}
          color={'white'}
        />
      );
    } else {
      content = (
        <MontserratText
          style={{
            color: selectedColor,
            fontSize: fontSizes[selectedFontSize],
            lineHeight: fontSizes[selectedFontSize] + 5
          }}
        >
          {this.props.uppercase ? this.props.text.toUpperCase() : this.props.text}
        </MontserratText>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.optionsContainer, { backgroundColor: this.props.backgroundColor }]}
        onPress={this.props.onPress}
      >
        { content }
      </TouchableOpacity>
    );
  }
}

RowText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  fontSize: PropTypes.string,
  uppercase: PropTypes.bool,
  backgroundColor: PropTypes.string
};

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    padding: 6
  }
});

export default RowText;
