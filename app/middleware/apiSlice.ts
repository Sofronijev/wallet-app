// //https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Auth from "modules/authStorage";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.0.13:5000",
  credentials: "include",
  prepareHeaders: async (headers) => {
    const token = await Auth.getToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// TODO - finish this
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log({ api, extraOptions });
    console.log(refreshResult);
    if (refreshResult?.data) {
      const state = api.getState();
      console.log(state);
      // store the new token
      // api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logOut());
      console.log("refresh Failed");
    }
  }

  return result;
};

export const apiSlice = createApi({
  tagTypes: ["Transactions"],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
