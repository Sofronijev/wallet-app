import { RootStateType } from "store/index";
import { Wallet } from "./walletsSlice";

export const getAllWallets = (state: RootStateType) => state.wallets.walletsById;

export const getWalletById =
  (walletId: number) =>
  (state: RootStateType): Wallet | undefined =>
    state.wallets.walletsById[walletId];

export const getActiveWalletId = (state: RootStateType) => state.wallets.activeWalletId;

export const getActiveWallet = (state: RootStateType): Wallet | undefined => {
  const activeWAlletId = getActiveWalletId(state);
  return state.wallets.walletsById[activeWAlletId];
};
