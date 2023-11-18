import { Wallet } from "store/reducers/wallets/walletsSlice";
import { apiSlice } from "./apiSlice";

export type GetWalletRequest = {
  userId: number;
};

export type GetWalletResponse = {
  wallets: Wallet[];
  count: number;
};

export const walletsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>. If there is no argument, use void
    getUserWallets: builder.query<GetWalletResponse, GetWalletRequest>({
      query: (data: GetWalletRequest) => ({
        url: "/wallets/getUserWallets",
        method: "POST",
        body: data,
      }),
      providesTags: ["Wallets"],
    }),
  }),
});

export const { useGetUserWalletsQuery } = walletsApi;
