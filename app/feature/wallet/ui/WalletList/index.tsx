import { FlatList, ListRenderItem, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import { useAppSelector } from "store/hooks";
import { getAllWallets } from "store/reducers/wallets/selectors";
import { Wallet, setActiveWallet } from "store/reducers/wallets/walletsSlice";
import Label from "components/Label";
import { formatDecimalDigits } from "modules/numbers";
import { getUserBalance } from "store/reducers/balance/selectors";
import colors from "constants/colors";
import { useDispatch } from "react-redux";
import AppActivityIndicator from "components/AppActivityIndicator";
import { getUserId } from "store/reducers/userSlice";
import { useGetUserWalletsQuery } from "app/middleware/wallets";
import { skipToken } from "@reduxjs/toolkit/dist/query";

type Props = {};

const WALLET_SPACING = 8;
const MARGIN = 16;

const walletKeyExtractor = (item: Wallet) => `${item.walletId}`;

const WalletList = (props: Props) => {
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

  const userBalance = useAppSelector(getUserBalance);
  const wallets = useAppSelector(getAllWallets);
  const walletsArray = Object.values(wallets);

  // const onWalletChange = (walletId: number) => () => {
  //   dispatch(setActiveWallet(walletId));
  // };

  const walletWidth = width - MARGIN * 2;
  const interval = walletWidth + WALLET_SPACING;

  const renderWallet: ListRenderItem<Wallet> = ({ item }) => {
    return (
      <View style={[styles.walletContainer, { width: walletWidth, borderColor: item.color }]}>
        <Label style={styles.walletName}>{item.walletName}</Label>
        <Label style={styles.balanceText}>Available balance</Label>
        <Label style={styles.walletValue}>{formatDecimalDigits(item.currentBalance)}</Label>
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={walletsArray}
        renderItem={renderWallet}
        keyExtractor={walletKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        decelerationRate='fast'
        snapToInterval={interval}
        ItemSeparatorComponent={() => <View style={{ width: WALLET_SPACING }}></View>}
        contentContainerStyle={styles.walletsFlatlist}
      />
      <AppActivityIndicator isLoading={isLoading || isFetching} />
    </>
  );
};

export default WalletList;

const styles = StyleSheet.create({
  walletsFlatlist: {
    paddingHorizontal: MARGIN,
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
