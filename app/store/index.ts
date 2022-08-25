import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "app/middleware/apiSlice";
import transactionsSlice from "./reducers/transactionsSlice";
import userReducer from "./reducers/userSlice";

const rootReducer = {
  user: userReducer,
  transactions: transactionsSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
