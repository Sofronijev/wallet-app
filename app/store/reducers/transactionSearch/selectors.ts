import { RootStateType } from "store/index";
import { TransactionType } from "../monthlyBalance/monthlyBalanceSlice";

export const getSearchedTransactions = (state: RootStateType): TransactionType[] => {
  return state.transactionSearch.transactions;
};

export const getSearchedTransactionsCount = (state: RootStateType): number => {
  return state.transactionSearch.count;
};
