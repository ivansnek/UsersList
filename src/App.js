import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppRoutes from 'routes';

export default class App extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <AppRoutes />
      </View>
    );
  }
}

const styles = StyleSheet.create({ container: { flex: 1 } });
