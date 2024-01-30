import { YOUR_ACTION_TYPE } from "../actions/yourAction";

// reducers/yourReducer.js
const initialState = {
  hello: true,
  bye: false,
};

const yourReducer = (state = initialState, action) => {
  switch (action.type) {
    case YOUR_ACTION_TYPE:
      return {
        ...state,
        hello: !state.hello,
        bye: !state.bye,
      };
    default:
      return state;
  }
};

export default yourReducer;
