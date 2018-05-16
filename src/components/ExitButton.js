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
  try {
    navigation.replace('Login');
    await AsyncStorage.clear();
  } catch (err) {
    navigation.replace('Login');
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
