import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationStyles } from '@exponent/ex-navigation';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@exponent/vector-icons';
import Colors from '../constants/Colors';
import Profile from '../components/Profile';

@withNavigation
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this._goToFriends = this._goToFriends.bind(this);
  }

  _goToFriends() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Profile username={this.props.auth.user} />

        <ActionButton
          buttonColor={Colors.red}
          icon={
            <Ionicons
              name={'ios-share-outline'}
              style={{ color: '#FFF', fontSize: 35, transform: [{ rotate: '180deg' }] }}
            />
          }
          offsetX={15}
          offsetY={0}
          hideShadow
          onPress={this._goToFriends}
        />
      </View>
    );
  }
}

ProfileScreen.route = {
  navigationBar: {
    visible: false
  },
  styles: {
    ...NavigationStyles.FloatVertical,
    gestures: null
  }
};

ProfileScreen.propTypes = {
  auth: PropTypes.object,
  navigator: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
