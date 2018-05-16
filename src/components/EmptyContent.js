import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Colors, Images, Fonts, Metrics } from 'theme';

export default function({ children }) {
  const { container, label, sadFaceLogo } = styles;
  return (
    <View style={container}>
      <Text style={label}>
        You don{`'`}t have any contacts yet
        {'\n'}
        Press the add button below
      </Text>
      <Image source={Images.sadFace} style={sadFaceLogo} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 50,
    alignItems: 'center'
  },
  label: {
    ...Fonts.h2b,
    color: Colors.lightOverlay,
    textAlign: 'center'
  },
  sadFaceLogo: {
    width: Metrics.images.logo,
    height: Metrics.images.logo,
    tintColor: Colors.lightOverlay
  }
});
