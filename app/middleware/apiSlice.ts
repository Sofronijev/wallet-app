// //https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Auth from "modules/authStorage";
import { Alert } from "react-native";
import { clearUserData } from "store/reducers/userSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://walletapi.milossofronijevic.com",
  baseUrl: "http://192.168.1.5:5000/",
  credentials: "include",
  prepareHeaders: async (headers) => {
    const accessToken = await Auth.getAccessToken();
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = await Auth.getRefreshToken();
    const refreshResult = await baseQuery(
      {
        url: "/refreshToken",
        method: "POST",
        body: {
          refreshToken,
        },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      Auth.storeAccessToken(accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      await Auth.removeRefreshToken();
      api.dispatch(clearUserData());
      Alert.alert("An error was encountered while trying to authenticate", "Please login again");
    }
  }

  return result;
};

export const apiSlice = createApi({
  tagTypes: ["Transactions", "Wallets"],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
