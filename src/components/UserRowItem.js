'use strict';

// @flow

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MKCheckbox } from 'react-native-material-kit';

import { Metrics, Colors, Fonts } from 'theme';
import type { UserType } from 'types';

type Props = {
  user: UserType,
  photoURL: string,
  onActivePress: () => void,
  onPress: () => void
};

type State = {};

export default function({ user, photoURL, onActivePress, onPress }: Props) {
  const {
    container,
    infoContainer,
    avatar,
    actionBox,
    userTitle,
    userName
  } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={container}>
        <Image source={{ uri: photoURL }} style={avatar} />
        <View style={infoContainer}>
          <Text style={userTitle}>{user.name}{' '}{user.lastname}</Text>
          <Text style={userName}>{user.username}</Text>
        </View>
        <View style={actionBox}>
          <MKCheckbox checked onPress={onActivePress} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Metrics.basePadding,
    flexDirection: 'row'
  },
  actionBox: {
    flex: 1,
    alignItems: 'flex-end'
  },
  infoContainer: {
    flex: 2,
    marginHorizontal: 10,
    flexDirection: 'column'
  },
  avatar: {
    flex: 0,
    width: Metrics.icons.large,
    height: Metrics.icons.large,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: Colors.lightOverlay
  },
  userTitle: {
    ...Fonts.h3b,
    color: Colors.primaryText
  },
  userName: {
    ...Fonts.h5,
    color: Colors.secondaryText
  }
});
