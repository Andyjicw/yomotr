import React, { PropTypes } from 'react';
import { View, Text, ScrollView,
         ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import RowText from './RowText';

const colorsOrder = [
  Colors.green2,
  Colors.green1,
  Colors.blue1,
  Colors.blue3,
  Colors.green3,
  Colors.yellow,
  Colors.blue2,
  Colors.purple
];

class RowTextList extends React.Component {
  _makeList(links) {
    return links.map((item, index) => {
      const link = item;
      link.backgroundColor = colorsOrder[index % colorsOrder.length];

      return this._renderRow(link);
    });
  }

  _renderRow(rowData) {
    return (
      <RowText
        key={rowData.text}
        uppercase={rowData.uppercase}
        text={rowData.text}
        fontSize={rowData.fontSize}
        backgroundColor={rowData.backgroundColor}
        onPress={rowData.onPress}
      />
    );
  }

  render() {
    return (
      <View>
        {this._makeList(this.props.list)}
      </View>
    );
  }
}

RowTextList.propTypes = {
  list: PropTypes.array.isRequired
};

export default RowTextList;
