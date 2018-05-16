'use strict';

// @flow

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { MKButton, MKTextField } from 'react-native-material-kit';

import { Images, Colors, Fonts, Metrics } from 'theme';
import { login, userChanged, passwordChanged } from 'actions/AuthActions';
import type { Action, Credentials } from 'types';

type Props = {
  navigation: any,
  user: string,
  password: string,
  error: string,
  passwordChanged: (payload: string) => Action,
  userChanged: (payload: string) => Action,
  login: (user: Credentials, cb: () => void) => Action
};

type AnimatedValue = Animated.Value;

type AnimatedValueXY = Animated.ValueXY;

type State = {
  loading: boolean
};
class LoginView extends React.PureComponent<Props, State> {
  logoTraslationValue: AnimatedValueXY;
  logoScaleValue: AnimatedValue;
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    this.logoTraslationValue = new Animated.ValueXY();
    this.logoScaleValue = new Animated.Value(1);
  }

  handleKeyboardDidShow = (): void => {
    Animated.parallel([
      Animated.timing(this.logoTraslationValue, {
        toValue: { x: 0, y: -35 },
        duration: 200,
        easing: Easing.linear
      }).start(),
      Animated.timing(this.logoScaleValue, {
        toValue: 0.75,
        duration: 200,
        easing: Easing.linear
      }).start()
    ]);
  };

  _validForm(): boolean {
    const { user, password } = this.props;
    return !_.isEmpty(user) && !_.isEmpty(password);
  }

  handleOnLogin = (): void => {
    const { user, password, login } = this.props;
    const navigateToList = () => this.props.navigation.replace('UsersList');
    if (this._validForm()) {
      this.setState({ loading: true });
      login({ user, password }, navigateToList);
    }
  };

  _handleKeyboardDidHide = (): void => {
    Animated.parallel([
      Animated.timing(this.logoTraslationValue, {
        toValue: { x: 0, y: 0 },
        duration: 200,
        easing: Easing.linear
      }).start(),
      Animated.timing(this.logoScaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }).start()
    ]);
  };

  _renderLoading = () => (
    <ActivityIndicator color={Colors.white} size="large" />
  );

  _renderError = () => {
    setTimeout(() => this.setState({ loading: false }), 1);
    return <Text style={styles.errorLabel}>{this.props.error}</Text>;
  };

  render() {
    const {
      container,
      logoContainer,
      logoStyle,
      logoStyleSmall,
      inputContainer,
      inputStyle,
      textStyle,
      buttonStyle,
      buttonTextStyle,
      imgBackground,
      buttonShadowOffset,
      errorLabel
    } = styles;
    const animateLogoTransform = {
      transform: [
        ...this.logoTraslationValue.getTranslateTransform(),
        { scale: this.logoScaleValue }
      ]
    };
    return (
      <ImageBackground
        blurRadius={50}
        source={Images.loginBackground}
        style={imgBackground}
      >
        <KeyboardAvoidingView behavior="padding" style={[container]}>
          <View style={logoContainer}>
            <Animated.Image
              source={Images.logo}
              style={[logoStyle, animateLogoTransform]}
            />
          </View>
          <View style={inputContainer}>
            <MKTextField
              autoCapitalize="none"
              onBlur={this._handleKeyboardDidHide}
              onFocus={this.handleKeyboardDidShow}
              onTextChange={user => this.props.userChanged(user)}
              placeholder="Enter your username"
              placeholderTextColor={Colors.white}
              returnKeyType="next"
              style={inputStyle}
              textInputStyle={textStyle}
              tintColor={Colors.white}
              value={this.props.user}
            />
            <MKTextField
              autoCapitalize="none"
              onBlur={this._handleKeyboardDidHide}
              onFocus={this.handleKeyboardDidShow}
              onTextChange={password => this.props.passwordChanged(password)}
              password
              placeholder="Enter your password"
              placeholderTextColor={Colors.white}
              returnKeyType="send"
              style={inputStyle}
              textInputStyle={textStyle}
              tintColor={Colors.white}
              value={this.props.password}
            />
          </View>
          {this.state.loading && this._renderLoading()}
          {this.props.error && this._renderError()}
          <View style={inputContainer}>
            <MKButton
              backgroundColor={Colors.accentColor}
              onPress={this.handleOnLogin}
              shadowColor={Colors.black}
              shadowOffset={buttonShadowOffset}
              shadowOpacity={0.7}
              shadowRadius={2}
              style={buttonStyle}
            >
              <Text pointerEvents="none" style={styles.buttonTextStyle}>
                LOGIN
              </Text>
            </MKButton>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  password: auth.password,
  error: auth.error
});

export default connect(mapStateToProps, {
  login,
  passwordChanged,
  userChanged
})(LoginView);

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1
  },
  buttonShadowOffset: {
    width: 0,
    height: 2
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Colors.lightOverlay
  },
  inputContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    minHeight: 170,
    paddingVertical: 40
  },
  textStyle: {
    ...Fonts.h3b,
    color: Colors.white,
    textAlign: 'center'
  },
  buttonTextStyle: {
    ...Fonts.h3b,
    color: Colors.white
  },
  buttonTextStyleDark: {
    ...Fonts.h3b,
    color: Colors.blue
  },
  inputStyle: {
    height: 60,
    width: '90%',
    paddingHorizontal: 10,
    marginVertical: 5
  },
  logoContainer: {
    flex: 3,
    marginVertical: 80
  },
  logoStyle: {
    width: Metrics.images.logo,
    height: Metrics.images.logo,
    borderRadius: 25,
    paddingVertical: 20
  },
  logoStyleSmall: {
    width: 100,
    height: 100,
    borderRadius: 15,
    paddingVertical: 10
  },
  buttonStyle: {
    height: 50,
    width: '65%',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorLabel: {
    ...Fonts.h4b,
    color: Colors.errorColor,
    backgroundColor: Colors.lightOverlay
  }
});
