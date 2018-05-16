import _ from 'lodash';
import {
  USER_LOAD_USERS,
  USER_LOAD_USERS_ERROR,
  USER_ADD_SUCCESS,
  USER_ADD_ERROR,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_NAME_CHANGED,
  USER_LASTNAME_CHANGED,
  USER_AGE_CHANGED,
  USER_GENDER_CHANGED,
  USER_USERNAME_CHANGED,
  USER_PASSWORD_CHANGED,
  USER_ACTIVE_CHANGED,
  USER_LOAD_USER,
  USER_LOAD_USER_ERROR
} from '../actions/UsersActions';

const INITIAL_STATE = {
  users: [],
  id: '',
  name: '',
  lastName: '',
  age: 0,
  gender: '',
  active: false,
  username: '',
  password: '',
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_NAME_CHANGED:
      return { ...state, name: action.payload };
    case USER_LASTNAME_CHANGED:
      return { ...state, lastName: action.payload };
    case USER_AGE_CHANGED:
      return { ...state, age: action.payload };
    case USER_GENDER_CHANGED:
      return { ...state, gender: action.payload };
    case USER_USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case USER_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case USER_LOAD_USERS:
      return { ...state, users: action.payload, error: null };
    case USER_LOAD_USERS_ERROR:
      return { ...state, error: action.payload };
    case USER_ACTIVE_CHANGED:
      return { ...state, active: action.payload, error: null };
    case USER_ADD_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        name: '',
        lastName: '',
        age: 0,
        gender: '',
        active: false,
        username: '',
        password: ''
      };
    case USER_ADD_ERROR:
      return { ...state, error: action.payload };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        users: _.unionBy([...state.users], action.payload, 'id'),
        name: '',
        lastName: '',
        age: 0,
        gender: '',
        active: false,
        username: '',
        password: ''
      };
    case USER_UPDATE_ERROR:
      return { ...state, error: action.payload };
    case USER_LOAD_USER:
      const {
        name,
        lastName,
        age,
        gender,
        active,
        username,
        password
      } = action.payload;
      return {
        ...state,
        error: null,
        name,
        lastName,
        age,
        gender,
        active,
        username,
        password
      };
    default:
      return INITIAL_STATE;
  }
}
