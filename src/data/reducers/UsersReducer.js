'use strict';

// @flow

const INITIAL_STATE = {
  users: [],
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        title: action.payload.title,
        message: action.payload.message,
        show: action.payload.show
      };
      break;
    default:
      return state;
      break;
  }
};
