import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image
} from 'react-native';

import { Colors, Images, Metrics } from 'theme';

export default class LoginLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    try {
      const userSaved = await AsyncStorage.getItem('AppStoreUser');
      this.props.navigation.navigate(userSaved ? 'App' : 'Auth');
    } catch (err) {
      console.log('Error', err);
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.logo} style={styles.logoStyle} />
        <ActivityIndicator color={Colors.secondaryColor} size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 50,
    backgroundColor: Colors.darkPrimaryColor
  },
  logoStyle: {
    width: Metrics.images.logo,
    height: Metrics.images.logo,
    borderRadius: 25
  }
});
