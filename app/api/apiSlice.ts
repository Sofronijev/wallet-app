//https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponseType, UserStoreType } from "store/reducers/userSlice";
import Auth from "modules/authStorage";

type LoginRequest = {
  email: string;
  password: string;
};

type CreateTransactionResponse = {
  id: number;
};

export type CreateTransactionRequest = {
  amount: number;
  description: string;
  date: string;
  user_id: number;
  type_id: number;
  category_id: number;
};

type getMonthlyTransactionsRequest = {
  user_id: number;
  start: number;
  count: number;
  date: string;
};

type getMonthlyTransactionsResponse = {
  // TODO - fix type
  transactions: any[];
  count: number;
  expense: number | null;
  income: number | null;
};

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
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>. If there is no argument, use void
    loginUser: builder.mutation<LoginResponseType, LoginRequest>({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
    }),
    createNewTransaction: builder.mutation<CreateTransactionResponse, CreateTransactionRequest>({
      query: (transactionData) => ({
        url: "/transaction/addTransaction",
        method: "POST",
        body: transactionData,
      }),
    }),
    getMonthlyUserTransactions: builder.mutation<
      getMonthlyTransactionsResponse,
      getMonthlyTransactionsRequest
    >({
      query: (data) => ({
        url: "/transaction/getMonthlyUserTransactions",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useLoginUserMutation,
  useGetMonthlyUserTransactionsMutation,
  useCreateNewTransactionMutation,
} = apiSlice;
