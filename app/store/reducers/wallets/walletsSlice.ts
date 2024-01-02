import { createSlice } from "@reduxjs/toolkit";
import { GetWalletRequest, GetWalletResponse, walletsApi } from "app/middleware/wallets";
import { SliceAction } from "store/type";

const WalletTypes = {
  system: "system",
  custom: "custom",
} as const;

export type Wallet = {
  walletId: number;
  startingBalance: number;
  walletName: string;
  type: keyof typeof WalletTypes;
  currencyCode: string;
  currencySymbol: string;
  currentBalance: number;
  color: string;
};

type WalletStoreType = {
  walletsById: Record<number | string, Wallet>;
  activeWalletId: number;
  count: number;
};

const initialWalletsState: WalletStoreType = {
  walletsById: {},
  activeWalletId: 0,
  count: 0,
};

const transformWallets = (wallets: Wallet[]) => {
  return wallets.reduce((acc, wallet) => {
    return {
      ...acc,
      [wallet.walletId]: wallet,
    };
  }, {});
};

export const walletsSlice = createSlice({
  name: "wallets",
  initialState: initialWalletsState,
  reducers: {
    setUserWallets: (state, action: SliceAction<GetWalletResponse>) => {
      state.walletsById = transformWallets(action.payload.wallets);
      state.count = action.payload.count;
      state.activeWalletId = action.payload.wallets[0].walletId;
    },
    setActiveWallet: (state, action: SliceAction<number>) => {
      state.activeWalletId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      walletsApi.endpoints.getUserWallets.matchFulfilled,
      (state, action: SliceAction<GetWalletResponse, GetWalletRequest>) => {
        state.walletsById = transformWallets(action.payload.wallets);
        state.count = action.payload.count;
        state.activeWalletId = action.payload.wallets[0].walletId;
      }
    );
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { setUserWallets, setActiveWallet } = walletsSlice.actions;

export default walletsSlice.reducer;
