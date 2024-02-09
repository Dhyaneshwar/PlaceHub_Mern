import { LOG_IN_ACTION, LOG_OUT_ACTION } from "../actions/authAction";

// reducers/authReducer.js
const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_ACTION:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOG_OUT_ACTION:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
