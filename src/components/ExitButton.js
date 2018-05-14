'use strict';

// @flow

import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { Colors, Metrics, Images } from 'theme';

type Props = {
  navigation: any
};

const onExitHandler = async (navigation: any): any => {
  navigation.replace('Login');
  try {
    const deleted = await AsyncStorage.removeItem('AUTH.USER');
  } catch (err) {
    console.log('ERROR', err);
  }
};

export default function({ navigation }: Props) {
  return (
    <TouchableOpacity onPress={() => onExitHandler(navigation)}>
      <Image source={Images.exit} style={styles.imageContainer} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Metrics.icons.small,
    height: Metrics.icons.small,
    marginRight: Metrics.baseMargin,
    tintColor: Colors.white
  }
});
