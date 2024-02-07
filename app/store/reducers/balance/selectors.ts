import { RootStateType } from "store/index";
import { TransactionType } from "../monthlyBalance/monthlyBalanceSlice";

export const getUserRecentTransactions = (state: RootStateType): TransactionType[] =>
  state.balance.recentTransactions.transactions;

export const getUserRecentTransactionsCount = (state: RootStateType): number =>
  state.balance.recentTransactions.count;
