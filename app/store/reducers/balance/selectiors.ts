import { RootStateType } from "store/index";
import { TransactionType } from "../monthlyBalance/monthlyBalanceSlice";

export const getUserBalance = (state: RootStateType): number => state.balance.balance;

export const getUserRecentTransactions = (state: RootStateType): TransactionType[] => {
  return state.balance.recentTransactions;
};
