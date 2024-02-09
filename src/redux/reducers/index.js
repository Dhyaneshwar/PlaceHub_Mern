// reducers/index.js
import { combineReducers } from "redux";
import yourReducer from "./yourReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
  yourReducer,
  // Add more reducers as needed
});

export default rootReducer;
