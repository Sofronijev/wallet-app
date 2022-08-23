//https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponseType, UserStoreType } from "store/reducers/userSlice";
import Auth from "modules/authStorage";
import { TransactionStoreType, TransactionType } from "store/reducers/transactionsSlice";
import {
  createNewTransactionQuery,
  CreateTransactionReq,
  getMonthlyTransactionsQuery,
  MonthlyTransactionsReq,
} from "app/middleware/transactions";
import { LoginRequest, loginUserQuery } from "app/middleware/auth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.13:5000",
    prepareHeaders: async (headers) => {
      const token = await Auth.getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Transactions", "Users"],
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>. If there is no argument, use void
    loginUser: builder.mutation<LoginResponseType, LoginRequest>({
      query: loginUserQuery,
    }),
    getMonthlyUserTransactions: builder.query<TransactionStoreType, MonthlyTransactionsReq>({
      query: getMonthlyTransactionsQuery,
      providesTags: ["Transactions"],
    }),
    createNewTransaction: builder.mutation<TransactionType, CreateTransactionReq>({
      query: createNewTransactionQuery,
      invalidatesTags: ["Transactions"], // Used to refetch transactions, connected to providesTags
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetMonthlyUserTransactionsQuery,
  useCreateNewTransactionMutation,
} = apiSlice;
