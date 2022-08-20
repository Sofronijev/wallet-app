import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "api/apiSlice";
import { RootStateType } from "../index";

export type TransactionType = {
  id: number;
  amount: number;
  description: string;
  date: string;
  userId: number;
  typeId: number;
  categoryId: number;
};

export type TransactionStoreType = {
  transactions: TransactionType[];
  count: number;
  expense: number | null;
  income: number | null;
};

const initialTransactionState: TransactionStoreType = {
  transactions: [],
  count: 0,
  expense: null,
  income: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialTransactionState,
  reducers: {
    setTransactionData: (state, action: PayloadAction<TransactionStoreType>) => {
      state = action.payload;
    },
    clearTransactionData: () => {
      return initialTransactionState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getMonthlyUserTransactions.matchFulfilled,
      (state, action: PayloadAction<TransactionStoreType>) => {
        return action.payload;
      }
    );
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { setTransactionData, clearTransactionData } = transactionSlice.actions;

export const getMonthlyTransactions = (state: RootStateType): TransactionType[] =>
  state.transactions?.transactions ?? [];

export const getMonthlyBalance = (
  state: RootStateType
): { expense: number | null; income: number | null } => {
  const { income, expense } = state.transactions;
  return {
    income,
    expense,
  };
};

export default transactionSlice.reducer;
