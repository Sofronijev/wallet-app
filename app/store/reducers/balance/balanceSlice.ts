import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { transactionsApi } from "app/middleware/transactions";
import { TransactionType } from "../transactionsSlice";

export type BalanceStoreType = {
  balance: number;
  recentTransactions: TransactionType[];
};

const initialBalanceState: BalanceStoreType = {
  recentTransactions: [],
  balance: 0,
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState: initialBalanceState,
  reducers: {
    clearBalanceData: () => {
      return initialBalanceState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      transactionsApi.endpoints.getUserBalance.matchFulfilled,
      (state, action: PayloadAction<BalanceStoreType>) => {
        return action.payload;
      }
    );
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { clearBalanceData } = balanceSlice.actions;

export default balanceSlice.reducer;
