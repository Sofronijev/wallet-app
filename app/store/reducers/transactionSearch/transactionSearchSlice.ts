import { createSlice } from "@reduxjs/toolkit";
import { transactionsApi } from "app/middleware/transactions";
import { TransactionType } from "../monthlyBalance/monthlyBalanceSlice";
import { SliceAction } from "store/type";

export type TransactionSearchStoreType = {
  transactions: TransactionType[];
  count: number;
};

const initialTransactionSearchState: TransactionSearchStoreType = {
  transactions: [],
  count: 0,
};

export const transactionSearchSlice = createSlice({
  name: "transactionSearch",
  initialState: initialTransactionSearchState,
  reducers: {
    clearBalanceData: () => {
      return initialTransactionSearchState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      transactionsApi.endpoints.searchTransactions.matchFulfilled,
      (state, action: SliceAction<TransactionSearchStoreType>) => {
        return {
          ...state,
          transactions: action.payload.transactions,
          count: action.payload.count,
        };
      }
    );
    builder.addMatcher(
      transactionsApi.endpoints.searchTransactionsMore.matchFulfilled,
      (state, action: SliceAction<TransactionSearchStoreType>) => {
        return {
          ...state,
          transactions: [...state.transactions, ...action.payload.transactions],
        };
      }
    );
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { clearBalanceData } = transactionSearchSlice.actions;

export default transactionSearchSlice.reducer;
