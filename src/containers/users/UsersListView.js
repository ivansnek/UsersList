'use strict';

// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'theme';

type Props = {};
type State = {};

export default class UsersList extends React.PureComponent<Props, State> {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.white
  };
  render() {
    return (
      <View style={styles.container}>
        <Text> USER LIST</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
