import { all } from "redux-saga/effects";
import { watchYourSaga } from "./yourSaga";

function* rootSaga() {
  yield all([
    watchYourSaga(),
    // Add more sagas as needed
  ]);
}

export default rootSaga;
