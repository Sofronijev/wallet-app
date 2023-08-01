import { createSlice } from "@reduxjs/toolkit";
import { MonthlyTransactionsReq, transactionsApi } from "app/middleware/transactions";
import { RootStateType } from "../index";
import { SliceAction } from "store/type";
import { getFormattedDate, monthYearFormat } from "modules/timeAndDate";

const formatDataForStore = (date: Date | string) => getFormattedDate(date, monthYearFormat);

export type TransactionType = {
  id: number;
  amount: number;
  description: string;
  date: string;
  userId: number;
  typeId: number;
  categoryId: number;
};

type AccountBalance = { expense: number; income: number; balance: number };

export type MonthlyBalanceType = {
  transactions: TransactionType[];
  count: number;
} & AccountBalance;

export type MonthlyBalanceStoreType = {
  balanceByMonth: Record<string, MonthlyBalanceType>;
};

const initialMonthlyBalanceState: MonthlyBalanceStoreType = {
  balanceByMonth: {},
};

export const monthlyBalanceSlice = createSlice({
  name: "transaction",
  initialState: initialMonthlyBalanceState,
  reducers: {
    clearTransactionData: () => {
      return initialMonthlyBalanceState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      transactionsApi.endpoints.getMonthlyUserTransactions.matchFulfilled,
      (state, action: SliceAction<MonthlyBalanceType, MonthlyTransactionsReq>) => {
        const date = action.meta.arg.originalArgs.date;
        const formattedDate = formatDataForStore(date);
        return {
          ...state,
          balanceByMonth: {
            ...state.balanceByMonth,
            [formattedDate]: action.payload,
          },
        };
      }
    );
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { clearTransactionData } = monthlyBalanceSlice.actions;

export const getMonthlyTransactions =
  (date: string | Date) =>
  (state: RootStateType): TransactionType[] => {
    const formattedDate = formatDataForStore(date);
    return state.monthlyBalance.balanceByMonth[formattedDate]?.transactions ?? [];
  };

export const getMonthlyBalance =
  (date: string | Date) =>
  (state: RootStateType): AccountBalance => {
    const formattedDate = formatDataForStore(date);
    const monthlyBalance = state.monthlyBalance.balanceByMonth[formattedDate];

    const income = monthlyBalance?.income ?? 0;
    const expense = monthlyBalance?.expense ?? 0;
    const balance = monthlyBalance?.balance ?? 0;
    return {
      income,
      expense,
      balance,
    };
  };

export default monthlyBalanceSlice.reducer;
