import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import UserService from 'db-services/UserService';
import AppRoutes from 'routes';
import AppStore from './data/AppStore';
import { hashCode } from 'utils';

export default class App extends React.PureComponent {
  componentDidMount() {
    UserService.findById('ADMIN')
      .then(res => {
        if (!res) {
          UserService.insert({
            id: 'ADMIN',
            name: 'ADMIN',
            lastName: '',
            active: true,
            username: 'ADMIN',
            password: '12345678'
          });
        }
      })
      .catch(err => console.log('ERROR', err));
  }

  render() {
    return (
      <Provider store={AppStore}>
        <View style={styles.container}>
          <AppRoutes />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({ container: { flex: 1 } });
