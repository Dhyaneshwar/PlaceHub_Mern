// reducers/index.js
import { combineReducers } from "redux";
import yourReducer from "./yourReducer";

const rootReducer = combineReducers({
  yourReducer,
  // Add more reducers as needed
});

export default rootReducer;
