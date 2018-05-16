'use strict';

// @flow

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { Colors, Images } from 'theme';
import {
  UserRowItem,
  ListSeparator,
  FloatButton,
  ExitButton,
  EmptyContent
} from 'components';
import type { UserType, Action } from 'types';
import { getAvatar } from 'utils';
import { Metrics } from 'theme';
import { loadUsers, updateUser } from 'actions/UsersActions';
import UserService from 'db-services/UserService';

const mockUsers = require('../../data/mock-users.json');

type Props = {
  navigation: any,
  loadUsers: Action,
  updateUser: Action,
  users: Array<UserType>
};

type State = {
  users: Array<UserType>
};

class UsersListView extends React.PureComponent<Props, State> {
  didFocus: () => void;
  static navigationOptions = ({ navigation }) => ({
    title: 'Users List',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.white,
    headerRight: <ExitButton navigation={navigation} />
  });
  constructor(props: Props) {
    super(props);
    // For mock data use 'mockUsers' on state
    this.state = {
      users: []
    };
    this.didFocus = this.props.navigation.addListener('willFocus', payload => {
      this.props.loadUsers();
    });
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  componentWillUnmount() {
    this.didFocus.remove();
  }

  _keyExtractor = (item: any, index: number) => `${item.id}-${index}`;

  _toggleUserActive = (user: UserType, active: boolean): void => {
    this.props.updateUser({ ...user, active: active });
  };

  _renderItem = ({ item, index }): React.Node => (
    <UserRowItem
      active={item.active}
      onActivePress={active => this._toggleUserActive(item, active)}
      onPress={() =>
        this.props.navigation.navigate('UserForm', {
          title: item.name,
          id: item.id
        })
      }
      photoURL={getAvatar(item.id, item.gender)}
      user={item}
    />
  );

  _navigateNewUser = () => {
    this.props.navigation.navigate('UserForm', { isNew: true });
  };

  render() {
    if (this.props.users.length === 0) {
      return (
        <EmptyContent>
          <FloatButton
            color={Colors.accentColor}
            onPress={this._navigateNewUser}
          >
            <Image source={Images.addUser} style={styles.addButtonIcon} />
          </FloatButton>
        </EmptyContent>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <ListSeparator color="light" />}
          data={this.props.users}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={styles.listStyle}
        />
        <FloatButton color={Colors.accentColor} onPress={this._navigateNewUser}>
          <Image source={Images.addUser} style={styles.addButtonIcon} />
        </FloatButton>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(mapStateToProps, { loadUsers, updateUser })(
  UsersListView
);

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
  listStyle: { flex: 1, width: '100%' },
  addButtonIcon: { width: 20, height: 20, tintColor: Colors.white }
});
