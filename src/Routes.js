import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);

import LoginLoadingView from 'containers/auth/LoginLoadingView';
import LoginView from 'containers/auth/LoginView';
import UsersListView from 'containers/users/UsersListView';
import UserFormView from 'containers/users/UserFormView';
import { Colors, Fonts } from './theme';

const AppNavigation = createStackNavigator({
  UsersList: {
    screen: UsersListView
  },
  UserForm: {
    screen: UserFormView
  },
  Login: {
    screen: LoginView,
    navigationOptions: {
      header: null
    }
  }
});

const LoginNavigation = createStackNavigator({
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
});

export default createSwitchNavigator(
  {
    AppLoading: LoginLoadingView,
    App: AppNavigation,
    Auth: LoginNavigation
  },
  {
    initialRouteName: 'AppLoading'
  }
);
