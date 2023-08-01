import { RootStateType } from "store/index";
import { TransactionType } from "../monthlyBalanceSlice";

export const getUserBalance = (state: RootStateType): number => state.balance.balance;

export const getUserRecentTransactions = (state: RootStateType): TransactionType[] => {
  return state.balance.recentTransactions;
};
