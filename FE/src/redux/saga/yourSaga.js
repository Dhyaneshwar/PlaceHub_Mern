// sagas/yourSaga.js
import { takeLatest, call, put } from "redux-saga/effects";
import { YOUR_ACTION_TYPE } from "../actions/yourAction";

function* yourSagaWorker(action) {
  try {
    console.log("hello world");
  } catch (error) {
    // Dispatch failure action with error
  }
}

export function* watchYourSaga() {
  yield takeLatest(YOUR_ACTION_TYPE, yourSagaWorker);
}
