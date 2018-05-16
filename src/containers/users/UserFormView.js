'use strict';

// @flow

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Picker,
  Modal,
  TouchableOpacity,
  Platform,
  PickerIOS
} from 'react-native';
import { MKButton, MKTextField, MKCheckbox } from 'react-native-material-kit';

import { Colors, Fonts, Metrics } from 'theme';
import type { UserType, Action, ThunkMiddleWare } from 'types';
import {
  nameChanged,
  lastNameChanged,
  ageChanged,
  genderChanged,
  usernameChanged,
  passwordChanged,
  activeChanged,
  addUser,
  updateUser,
  loadUserById
} from 'actions/UsersActions';

const TextFieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withFloatingLabelFont({ fontWeight: '200' })
  .withHighlightColor(Colors.primaryText)
  .build();

type Props = {
  navigation: any,
  nameChanged: Action,
  lastNameChanged: Action,
  ageChanged: Action,
  genderChanged: Action,
  usernameChanged: Action,
  passwordChanged: Action,
  activeChanged: Action,
  addUser: (payload: UserType, cb: () => void) => ThunkMiddleWare,
  updateUser: (payload: UserType, cb: () => void) => ThunkMiddleWare,
  id: string,
  name: string,
  lastName: string,
  age: number,
  gender: number,
  active: boolean,
  username: string,
  password: string,
  error: string,
  loadUserById: (payload: UserType) => ThunkMiddleWare
};

type State = {
  active: boolean,
  modalVisible: boolean,
  errorMessage: string
};
class UserFormView extends React.PureComponent<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: _.get(navigation, 'state.params.title', 'New User'),
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.white
  });
  constructor(props: Props) {
    super(props);
    this.state = {
      active: this.props.active,
      modalVisible: false,
      erroMessage: null
    };
  }

  componentDidMount() {
    const { navigation, loadUserById } = this.props;
    const isNew = navigation.getParam('isNew', false);
    const userId = navigation.getParam('id', null);
    if (!isNew && userId) {
      loadUserById(userId);
    }
  }

  _handleSave = () => {
    const {
      name,
      lastName,
      age,
      gender,
      active,
      username,
      password,
      navigation,
      addUser,
      updateUser
    } = this.props;
    const user = {
      id: navigation.getParam('id', null),
      name,
      lastName,
      age,
      gender,
      active: this.state.active,
      username,
      password
    };
    const navigateBack = navigation.goBack;
    if (this._isValidForm()) {
      if (navigation.getParam('isNew', false)) {
        addUser(user, navigateBack);
      } else {
        updateUser(user, navigateBack);
      }
    }
  };

  _isValidForm = (): boolean => {
    const regexValue = /^[0-9a-zA-Z]+$/;
    let errorMessage = '';
    const {
      name,
      lastName,
      age,
      gender,
      active,
      username,
      password
    } = this.props;
    if (name.length > 200) errorMessage += '\n-Name must be max 200 characters';
    if (name === '') errorMessage += '\n-Name is mandatory';
    if (lastName.length > 200)
      errorMessage += '\n-LastName must be max 200 characters';
    if (lastName === '') errorMessage += '\n-LastName is required';
    if (username === '') errorMessage += '\n-UserName is required';
    if (password === '') errorMessage += '\n-Password is required';
    if (username.length > 16)
      errorMessage += '\n-Username max lenght is 16 characters';
    if (password.length !== 8 && password.length !== 16)
      errorMessage += '\n-Password lenght must be is 8 or 16 characters';
    if (username.length > 16)
      errorMessage += '\n-Username max lenght is 16 characters';
    if (!regexValue.test(password))
      errorMessage += '\n-Password must be alphanumeric';
    if (!regexValue.test(username))
      errorMessage += '\n-Username must be alphanumeric';
    this.setState({ errorMessage: errorMessage !== '' ? errorMessage : null });
    return errorMessage === '';
  };

  _renderPicker = (): React.Node => {
    if (Platform.OS === 'ios') {
      return (
        <View style={{ width: '100%', height: 70 }}>
          <Text
            onPress={() => this.setState({ modalVisible: true })}
            style={styles.customPickerText}
          >
            {this.props.gender}
          </Text>
          <Modal
            animationType="slide"
            onRequestClose={() => this.setState({ modalVisible: false })}
            transparent
            visible={this.state.modalVisible}
          >
            <View style={styles.pickerContainer}>
              <PickerIOS
                onValueChange={(item, index) => {
                  this.setState({ modalVisible: false });
                  this.props.genderChanged(item);
                }}
                selectedValue={this.props.gender}
                style={styles.pickerGender}
              >
                <Picker.Item label="Men" value="Men" />
                <Picker.Item label="Women" value="Women" />
              </PickerIOS>
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <Picker
          onValueChange={(item, index) => this.props.genderChanged(item)}
          selectedValue={this.props.gender}
          style={styles.pickerGender}
        >
          <Picker.Item label="Men" value="Men" />
          <Picker.Item label="Women" value="Women" />
        </Picker>
      );
    }
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.centeredScrollView}
        style={styles.container}
      >
        <TextFieldWithFloatingLabel
          autoCapitalize="none"
          onTextChange={name => this.props.nameChanged(name)}
          placeholder="Name"
          style={styles.textfield}
          textInputStyle={{ color: Colors.primaryColor }}
          tintColor={Colors.accentColor}
          value={this.props.name}
        />
        <TextFieldWithFloatingLabel
          autoCapitalize="none"
          onTextChange={lastName => this.props.lastNameChanged(lastName)}
          placeholder="Lastname"
          style={styles.textfield}
          textInputStyle={{ color: Colors.primaryColor }}
          tintColor={Colors.accentColor}
          value={this.props.lastName}
        />
        <View style={styles.horizontalContainer}>
          <TextFieldWithFloatingLabel
            autoCapitalize="none"
            keyboardType="numeric"
            onTextChange={age => this.props.ageChanged(parseInt(age))}
            placeholder="Age"
            style={styles.genderInput}
            textInputStyle={{ color: Colors.primaryColor }}
            tintColor={Colors.accentColor}
            value={String(this.props.age)}
          />
          <View style={styles.flex1}>
            <Text>Gender</Text>
            {this._renderPicker()}
          </View>
        </View>
        <TextFieldWithFloatingLabel
          autoCapitalize="none"
          onTextChange={username => this.props.usernameChanged(username)}
          placeholder="Username"
          style={styles.textfield}
          textInputStyle={{ color: Colors.primaryColor }}
          tintColor={Colors.accentColor}
          value={this.props.username}
        />
        <TextFieldWithFloatingLabel
          autoCapitalize="none"
          onTextChange={password => this.props.passwordChanged(password)}
          password
          placeholder="Password"
          style={styles.textfield}
          textInputStyle={{ color: Colors.primaryColor }}
          tintColor={Colors.accentColor}
          value={this.props.password}
        />
        <View style={styles.w100}>
          <Text>Active:</Text>
          <MKCheckbox
            borderOnColor={Colors.primaryColor}
            checked={this.state.active}
            fillColor={Colors.primaryColor}
            onCheckedChange={(event: any) => {
              this.setState({ active: event.checked });
              this.props.activeChanged(event.checked);
            }}
          />
        </View>
        {this.props.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>{this.props.error}</Text>
          </View>
        )}
        {this.state.errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>{this.state.errorMessage}</Text>
          </View>
        )}
        <MKButton
          backgroundColor={Colors.accentColor}
          onPress={this._handleSave}
          shadowColor={Colors.black}
          shadowOpacity={0.7}
          shadowRadius={2}
          style={styles.buttonStyle}
        >
          <Text pointerEvents="none" style={styles.buttonTextStyle}>
            SAVE
          </Text>
        </MKButton>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  id: user.id,
  name: user.name,
  lastName: user.lastName,
  age: user.age,
  gender: user.gender,
  active: user.active,
  username: user.username,
  password: user.password,
  error: user.error
});

export default connect(mapStateToProps, {
  nameChanged,
  lastNameChanged,
  ageChanged,
  genderChanged,
  usernameChanged,
  passwordChanged,
  activeChanged,
  addUser,
  updateUser,
  loadUserById
})(UserFormView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    padding: 15,
    paddingBottom: 20
  },
  centeredScrollView: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textfield: {
    width: '100%',
    height: 70
  },
  genderInput: { height: 70, width: '90%', flex: 1 },
  buttonTextStyle: {
    ...Fonts.h3b,
    color: Colors.white
  },
  buttonStyle: {
    height: 50,
    width: '65%',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  customPickerText: {
    ...Fonts.h4,
    width: '100%',
    paddingTop: 5,
    height: 70,
    color: Colors.primaryColor
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    height: 200,
    bottom: 0,
    position: 'absolute',
    zIndex: 1000
  },
  errorContainer: { width: '100%', padding: 5, minHeight: 30 },
  errorLabel: { ...Fonts.normal, color: Colors.errorColor },
  horizontalContainer: { flexDirection: 'row' },
  flex1: { flex: 1 },
  w100: { width: '100%' },
  pickerGender: { height: 50, width: '100%' }
});
