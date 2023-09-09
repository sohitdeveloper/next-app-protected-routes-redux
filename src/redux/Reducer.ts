import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const rootReducers = combineReducers({
  auth: authSlice,
});
