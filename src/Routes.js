'use strict';

// @flow

import { createStackNavigator } from 'react-navigation';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);

import LoginView from 'containers/auth/LoginView';
import UsersListView from 'containers/users/UsersListView';
import UserFormView from 'containers/users/UserFormView';
import { Colors, Fonts } from './theme';

export default createStackNavigator(
  {
    Login: {
      screen: LoginView,
      navigationOptions: {
        header: null
      }
    },
    UsersList: {
      screen: UsersListView
    },
    UserForm: {
      screen: UserFormView
    }
  },
  {
    initialRouteName: 'UsersList'
  }
);
