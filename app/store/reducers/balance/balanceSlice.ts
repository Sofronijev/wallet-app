import { createSlice } from "@reduxjs/toolkit";
import {
  GetUserBalanceReq,
  SearchTransactionsResponse,
  transactionsApi,
} from "app/middleware/transactions";
import { TransactionType } from "../monthlyBalance/monthlyBalanceSlice";
import { SliceAction } from "store/type";

type BalanceStoreType = {
  recentTransactions: { transactions: TransactionType[]; count: number };
};

const initialBalanceState: BalanceStoreType = {
  recentTransactions: {
    transactions: [],
    count: 0,
  },
};

// TODO - Change name if it is used only for Recent transactions
// Used for balance screen
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
      transactionsApi.endpoints.getUserRecentTransactions.matchFulfilled,
      (state, action: SliceAction<SearchTransactionsResponse, GetUserBalanceReq>) => {
        state.recentTransactions = action.payload;
      }
    );
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { clearBalanceData } = balanceSlice.actions;

export default balanceSlice.reducer;
