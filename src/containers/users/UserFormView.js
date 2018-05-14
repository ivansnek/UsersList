import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'theme';

export default class UserFormView extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: _.get(navigation, 'state.params.title', 'New User'),
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.white
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>User FORM</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
