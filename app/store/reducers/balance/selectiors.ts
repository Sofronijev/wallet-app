import { TransactionTypes } from "modules/transactionCategories";
import { RootStateType } from "store/index";

export const getUserBalance = (state: RootStateType): number => state.balance.balance;

export const getUserRecentTransactions = (state: RootStateType): TransactionTypes[] => {
  return state.balance.recentTransactions;
};
