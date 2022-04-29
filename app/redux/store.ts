import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

const rootReducer = {
  user: userReducer,
};

const store = configureStore({ reducer: rootReducer });

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
