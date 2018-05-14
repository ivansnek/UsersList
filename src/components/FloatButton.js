'use strict';

// @flow

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MKButton } from 'react-native-material-kit';

import { Colors, Metrics } from 'theme';

type Props = {
  icon: string,
  color: string,
  onPress: () => void
};

export default function({ icon, color, onPress, children }: Props) {
  return (
    <MKButton
      backgroundColor={color}
      onPress={onPress}
      shadowColor={Colors.black}
      shadowOffset={{width: 12, height: 12}}
      shadowOpacity={0.7}
      shadowRadius={2}
      style={styles.buttonStyle}
    >
      {children}
    </MKButton>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: Metrics.icons.large,
    height: Metrics.icons.large,
    borderRadius: 25,
    position: 'absolute',
    right: 10,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
