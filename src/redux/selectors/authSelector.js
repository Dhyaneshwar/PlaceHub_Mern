import { createSelector } from "@reduxjs/toolkit";

export const getAuthReducer = (state) => state.authReducer;

export const getIsLoggedInSelector = createSelector(
  [getAuthReducer],
  (state) => state.isLoggedIn
);
