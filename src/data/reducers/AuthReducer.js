import {
  AUTH_USER_CHANGED,
  AUTH_PASSWORD_CHANGED,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SAVE_ERROR,
  AUTH_BAD_CREDENTIALS
} from '../actions/AuthActions';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: '',
  password: '',
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER_CHANGED:
      return {
        ...state,
        user: action.payload
      };
    case AUTH_PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.payload,
        error: null
      };
    case AUTH_LOGIN_ERROR:
    case AUTH_LOGIN_SAVE_ERROR:
    case AUTH_BAD_CREDENTIALS:
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false
      };
    default:
      return INITIAL_STATE;
  }
}
