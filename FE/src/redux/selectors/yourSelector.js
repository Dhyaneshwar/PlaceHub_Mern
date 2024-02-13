import { createSelector } from "@reduxjs/toolkit";

export const getYourReducer = (state) => state.yourReducer;

export const getYourReducerHello = createSelector(
  [getYourReducer],
  (state) => state.hello
);

export const getYourReducerBye = createSelector(
  [getYourReducer],
  (state) => state.bye
);
