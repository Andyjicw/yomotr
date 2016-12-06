import React, { PropTypes } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

class LoadingIndicator extends React.Component {
  render() {
    if (!this.props.visible) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator
          color="white"
          size={this.props.size}
        />

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {this.props.message}
            {this.props.visible}
          </Text>
        </View>
      </View>
    );
  }
}

LoadingIndicator.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large'])
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 10
  },

  text: {
    color: '#CCC',
    fontSize: 14,
    fontWeight: '500'
  }
});

export default LoadingIndicator;
