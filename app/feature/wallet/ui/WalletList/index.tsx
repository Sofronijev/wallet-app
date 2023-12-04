import { ListRenderItem, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import { useAppSelector } from "store/hooks";
import { getAllWallets } from "store/reducers/wallets/selectors";
import { Wallet, setActiveWallet } from "store/reducers/wallets/walletsSlice";
import Label from "components/Label";
import { formatDecimalDigits } from "modules/numbers";
import colors from "constants/colors";
import { useDispatch } from "react-redux";
import AppActivityIndicator from "components/AppActivityIndicator";
import { getUserId } from "store/reducers/userSlice";
import { useGetUserWalletsQuery } from "app/middleware/wallets";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Carousel from "components/Carousel";

const WALLET_SPACING = 8;
const HORIZONTAL_PADDING = 16;

const walletKeyExtractor = (item: Wallet) => `${item.walletId}`;

const WalletList = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

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

  const onWalletChange = (item: Wallet) => {
    dispatch(setActiveWallet(item.walletId));
  };

  const walletWidth = width - HORIZONTAL_PADDING * 2;

  const renderWallet: ListRenderItem<Wallet> = ({ item }) => {
    return (
      <View style={[styles.walletContainer, { borderColor: item.color }]}>
        <Label style={styles.walletName}>{item.walletName}</Label>
        <Label style={styles.balanceText}>Available balance</Label>
        <Label style={styles.walletValue}>{formatDecimalDigits(item.currentBalance)}</Label>
      </View>
    );
  };
  return (
    <>
      <Carousel
        data={walletsArray}
        renderItem={renderWallet}
        keyExtractor={walletKeyExtractor}
        itemWidth={walletWidth}
        itemSpacing={WALLET_SPACING}
        style={styles.walletCarousel}
        onSnapToItem={onWalletChange}
      />
      <AppActivityIndicator isLoading={isLoading || isFetching} />
    </>
  );
};

export default WalletList;

const styles = StyleSheet.create({
  walletCarousel: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  walletContainer: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  balanceText: {
    textAlign: "center",
    color: colors.grey2,
  },
  walletValue: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  walletName: {
    fontSize: 23,
    fontWeight: "bold",
    paddingBottom: 20,
    paddingLeft: 10,
  },
  transactionContainer: {
    marginHorizontal: 16,
  },
});
