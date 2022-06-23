//https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserStoreType } from "store/reducers/userSlice";

type LoginRequest = {
  email: string;
  password: string;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.13:5000" }),
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>. If there is no argument, use void
    loginUser: builder.mutation<UserStoreType, LoginRequest>({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useLoginUserMutation } = apiSlice;
