import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "app/middleware/apiSlice";
import monthlyBalanceSlice from "./reducers/monthlyBalanceSlice";
import userReducer from "./reducers/userSlice";
import balanceSlice from "./reducers/balance/balanceSlice";

const rootReducer = {
  user: userReducer,
  monthlyBalance: monthlyBalanceSlice,
  balance: balanceSlice,
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
