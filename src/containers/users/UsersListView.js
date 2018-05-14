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

import { Colors, Images } from 'theme';
import {
  UserRowItem,
  ListSeparator,
  FloatButton,
  ExitButton
} from 'components';
import type { UserType } from 'types';
import { generateRandomAvatar } from 'utils';
import { Metrics } from 'theme';
import UserService from 'services/UserService';

const mockUsers = require('../../data/mock-users.json');

type Props = {
  navigation: any
};
type State = {
  users: Array<UserType>
};

export default class UsersList extends React.PureComponent<Props, State> {
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
    this.state = {
      users: mockUsers
    };
  }

  componentDidMount() {
    UserService.findAll()
      .then(res => console.log('RES', res))
      .catch(err => console.log('ERR', err));
  }

  _keyExtractor = (item: any, index: number) => `${item.id}-${index}`;

  _loadUsers = () => {
    console.log('Load Users from BD');
  };

  _toggleUserActive = (user: any) => {
    console.log('Toggle with redux');
  };

  _renderItem = ({ item, index }): React.ComponentType => (
    <UserRowItem
      onActivePress={() => this._toggleUserActive(item)}
      onPress={() =>
        this.props.navigation.navigate('UserForm', { title: item.name })
      }
      photoURL={generateRandomAvatar(item.gender)}
      user={item}
    />
  );

  _addNewUser = () => {
    this.props.navigation.navigate('UserForm', { isNew: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <ListSeparator color="light" />}
          data={this.state.users}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={styles.listStyle}
        />
        <FloatButton color={Colors.accentColor} onPress={this._addNewUser}>
          <Image source={Images.addUser} style={styles.addButtonIcon} />
        </FloatButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
  listStyle: { flex: 1, width: '100%' },
  addButtonIcon: { width: 20, height: 20, tintColor: Colors.white }
});
