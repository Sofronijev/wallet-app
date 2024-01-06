import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import { useGetUserWalletsQuery } from "app/middleware/wallets";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import AppActivityIndicator from "components/AppActivityIndicator";
import { getAllWallets } from "store/reducers/wallets/selectors";
import WalletSettingsItem from "./WalletSettingsItem";

const WalletSettings: React.FC = () => {
  const userId = useAppSelector(getUserId);

  const { isLoading, isFetching } = useGetUserWalletsQuery(
    userId
      ? {
          userId,
        }
      : skipToken
  );

  const wallets = useAppSelector(getAllWallets);
  const walletsArray = Object.values(wallets);
  return (
    <>
      <FlatList
        data={walletsArray}
        renderItem={({ item }) => <WalletSettingsItem walletId={item.walletId} />}
      />
      <AppActivityIndicator isLoading={isLoading || isFetching} />
    </>
  );
};

export default WalletSettings;

const styles = StyleSheet.create({});
