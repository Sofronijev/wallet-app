//https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponseType, UserStoreType } from "store/reducers/userSlice";
import Auth from 'modules/authStorage';

type LoginRequest = {
  email: string;
  password: string;
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
    // TODO - fix this request
    getAllUserTransactions: builder.mutation<UserStoreType, number>({
      query: (userId) => ({
        url: "/transaction/getAllUserTransactions",
        method: "Post",
        body: { userId },
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useLoginUserMutation, useGetAllUserTransactionsMutation } = apiSlice;
