import { SimpleResponse } from "modules/types";
import {
  MonthlyBalanceType,
  TransactionType,
} from "store/reducers/monthlyBalance/monthlyBalanceSlice";
import { apiSlice } from "./apiSlice";

export type MonthlyTransactionsReq = {
  userId: number;
  start: number;
  count: number;
  date: string;
  walletIds: number[];
};

type CreateTransactionReq = {
  amount: number;
  description: string;
  date: string;
  userId: number;
  typeId: number;
  categoryId: number;
  walletId: number;
};

type EditTransactionReq = {
  id: number;
  amount: number;
  description: string;
  date: string;
  typeId: number;
  categoryId: number;
  walletId: number;
};

type DeleteTransactionReq = {
  id: number;
};

export type GetUserRecentTransactionsReq = {
  userId: number;
  walletIds: number[];
};

const RECENT_TRANSACTION_COUNT = 5;

type SearchTransactionsRequest = {
  userId: number;
  walletIds: number[];
  start?: number;
  count?: number;
  startDate?: string;
  endDate?: string;
  categories?: number[];
};

export type SearchTransactionsResponse = {
  transactions: TransactionType[];
  count: number;
};

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>. If there is no argument, use void
    getMonthlyUserTransactions: builder.query<MonthlyBalanceType, MonthlyTransactionsReq>({
      query: (data: MonthlyTransactionsReq) => ({
        url: "/transaction/getMonthlyUserTransactions",
        method: "POST",
        body: data,
      }),
      providesTags: ["Transactions"],
    }),
    createNewTransaction: builder.mutation<TransactionType, CreateTransactionReq>({
      query: (transactionData: CreateTransactionReq) => ({
        url: "/transaction/addTransaction",
        method: "POST",
        body: transactionData,
      }),
      // TODO: Currently, this will fetch all wallets, make it so it only refetches wallet that had changed transaction
      invalidatesTags: ["Transactions", "Wallets"], // Used to refetch transactions, connected to providesTags
    }),
    editTransaction: builder.mutation<SimpleResponse, EditTransactionReq>({
      query: (transactionData: EditTransactionReq) => ({
        url: "/transaction/setTransaction",
        method: "PUT",
        body: transactionData,
      }),
      // TODO: Currently, this will fetch all wallets, make it so it only refetches wallet that had changed transaction
      invalidatesTags: ["Transactions", "Wallets"], // Used to refetch transactions, connected to providesTags
    }),
    deleteTransaction: builder.mutation<SimpleResponse, DeleteTransactionReq>({
      query: (transactionData: DeleteTransactionReq) => ({
        url: "/transaction/deleteTransaction",
        method: "DELETE",
        body: transactionData,
      }),
      // TODO: Currently, this will fetch all wallets, make it so it only refetches wallet that had changed transaction
      invalidatesTags: ["Transactions", "Wallets"], // Used to refetch transactions, connected to providesTags
    }),
    getUserRecentTransactions: builder.query<SearchTransactionsResponse, GetUserRecentTransactionsReq>({
      query: (data: GetUserRecentTransactionsReq) => ({
        url: "/transaction/searchTransactions",
        method: "POST",
        body: { ...data, count: RECENT_TRANSACTION_COUNT },
      }),
      providesTags: ["Transactions"],
    }),
    searchTransactions: builder.query<SearchTransactionsResponse, SearchTransactionsRequest>({
      query: (data: SearchTransactionsRequest) => ({
        url: "/transaction/searchTransactions",
        method: "POST",
        body: data,
      }),
      providesTags: ["Transactions"],
    }),
    searchTransactionsMore: builder.mutation<SearchTransactionsResponse, SearchTransactionsRequest>(
      {
        query: (data: SearchTransactionsRequest) => ({
          url: "/transaction/searchTransactions",
          method: "POST",
          body: data,
        }),
      }
    ),
  }),
});
export const {
  useGetMonthlyUserTransactionsQuery,
  useCreateNewTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
  useGetUserRecentTransactionsQuery,
  useSearchTransactionsQuery,
  useSearchTransactionsMoreMutation,
} = transactionsApi;
