import { Wallet } from "store/reducers/wallets/walletsSlice";
import { apiSlice } from "./apiSlice";

export type GetWalletRequest = {
  userId: number;
};

export type GetWalletResponse = {
  wallets: Wallet[];
  count: number;
};

export type SetWalletStartingBalanceReq = {
  userId: number;
  walletId: number;
  value: number;
};

export type SetWalletStartingBalanceRes = {
  message: string;
};

export type SetWalletBalanceReq = {
  userId: number;
  walletId: number;
  value: number;
  date: string;
};

export type SetWalletBalanceRes = {
  message: string;
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
    setWalletStartingBalance: builder.mutation<
      SetWalletStartingBalanceRes,
      SetWalletStartingBalanceReq
    >({
      query: (data: SetWalletStartingBalanceReq) => ({
        url: "/wallets/setStartingBalance",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Wallets"],
    }),
    setWalletBalance: builder.mutation<SetWalletBalanceRes, SetWalletBalanceReq>({
      query: (data: SetWalletBalanceReq) => ({
        url: "/wallets/adjustBalance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallets", "Transactions"],
    }),
  }),
});

export const {
  useGetUserWalletsQuery,
  useSetWalletStartingBalanceMutation,
  useSetWalletBalanceMutation,
} = walletsApi;
