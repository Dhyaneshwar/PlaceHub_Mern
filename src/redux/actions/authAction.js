// actions/types.js
export const LOG_IN_ACTION = "LOG_IN";
export const LOG_OUT_ACTION = "LOG_OUT";

export const logInAction = (payload) => {
  return {
    type: LOG_IN_ACTION,
    payload,
  };
};

export const logOutAction = (payload) => {
  return {
    type: LOG_OUT_ACTION,
    payload,
  };
};
