import { SimpleResponse } from "modules/types";
import { TransactionStoreType, TransactionType } from "store/reducers/transactionsSlice";
import { apiSlice } from "./apiSlice";

export type MonthlyTransactionsReq = {
  user_id: number;
  start: number;
  count: number;
  date: string;
};

export type CreateTransactionReq = {
  amount: number;
  description: string;
  date: string;
  user_id: number;
  type_id: number;
  category_id: number;
};

export type EditTransactionReq = {
  id: number;
  amount: number;
  description: string;
  date: string;
  type_id: number;
  category_id: number;
};

export type DeleteTransactionReq = {
  id: number;
};

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>. If there is no argument, use void
    getMonthlyUserTransactions: builder.query<TransactionStoreType, MonthlyTransactionsReq>({
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
      invalidatesTags: ["Transactions"], // Used to refetch transactions, connected to providesTags
    }),
    editTransaction: builder.mutation<SimpleResponse, EditTransactionReq>({
      query: (transactionData: EditTransactionReq) => ({
        url: "/transaction/setTransaction",
        method: "PUT",
        body: transactionData,
      }),
      invalidatesTags: ["Transactions"], // Used to refetch transactions, connected to providesTags
    }),
    deleteTransaction: builder.mutation<SimpleResponse, DeleteTransactionReq>({
      query: (transactionData: DeleteTransactionReq) => ({
        url: "/transaction/deleteTransaction",
        method: "DELETE",
        body: transactionData,
      }),
      invalidatesTags: ["Transactions"], // Used to refetch transactions, connected to providesTags
    }),
  }),
});
export const {
  useGetMonthlyUserTransactionsQuery,
  useCreateNewTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
