import { SimpleResponse } from "modules/types";
import { MonthlyBalanceType, TransactionType } from "store/reducers/monthlyBalanceSlice";
import { apiSlice } from "./apiSlice";

export type MonthlyTransactionsReq = {
  userId: number;
  start: number;
  count: number;
  date: string;
};

export type CreateTransactionReq = {
  amount: number;
  description: string;
  date: string;
  userId: number;
  typeId: number;
  categoryId: number;
};

export type EditTransactionReq = {
  id: number;
  amount: number;
  description: string;
  date: string;
  typeId: number;
  categoryId: number;
};

export type DeleteTransactionReq = {
  id: number;
};

export type GetUserBalanceReq = {
  userId: number;
}

export type GetUserBalanceResponse = {
  balance: number;
  recentTransactions: TransactionType[];
}

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
    getUserBalance: builder.query<GetUserBalanceResponse, GetUserBalanceReq>({
      query: (data: MonthlyTransactionsReq) => ({
        url: "/transaction/getUserBalance",
        method: "POST",
        body: data,
      }),
      providesTags: ["Transactions"],
    }),
  }),
});
export const {
  useGetMonthlyUserTransactionsQuery,
  useCreateNewTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
  useGetUserBalanceQuery,
} = transactionsApi;
