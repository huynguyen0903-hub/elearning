/** @format */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import cartReducer from "./reducers/cartReducer";
import courseReducer from "./reducers/courseReducer";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";

const reducers = combineReducers({
  courseReducer: courseReducer,
  userReducer: userReducer,
  cartReducer: cartReducer,
  adminReducer: adminReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
