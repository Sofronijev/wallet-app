import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import Label from "components/Label";
import colors from "constants/colors";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import { useGetUserBalanceQuery } from "app/middleware/transactions";
import { getUserBalance, getUserRecentTransactions } from "store/reducers/balance/selectors";
import { formatDecimalDigits } from "modules/numbers";
import { errorStrings } from "constants/strings";
import AppActivityIndicator from "components/AppActivityIndicator";
import RecentTransactions from "feature/monthlyScreen/ui/RecentTransactions";
import BalanceTransactionNullScreen from "./BalanceTransactionNullScreen";
import AddButton from "components/AddButton";
import { useGetUserWalletsQuery } from "app/middleware/wallets";
import { getActiveWallet, getAllWallets } from "store/reducers/wallets/selectors";

const BalanceScreen: React.FC = () => {
  const userId = useAppSelector(getUserId);

  const {
    isLoading: isWalletsLoading,
    isError: isWalletsError,
    isFetching: isWalletsFetching,
  } = useGetUserWalletsQuery(
    userId
      ? {
          userId,
        }
      : skipToken
  );

  const userBalance = useAppSelector(getUserBalance);
  const transactions = useAppSelector(getUserRecentTransactions);
  const wallets = useAppSelector(getAllWallets);
  const activeWallet = useAppSelector(getActiveWallet);
  const walletName = activeWallet?.walletName ?? "";
  const walletId = activeWallet?.walletId;

  const { isLoading, isError, isFetching } = useGetUserBalanceQuery(
    userId && walletId
      ? {
          userId,
          walletIds: [walletId],
        }
      : skipToken
  );

  const isDataLoading = isLoading || isFetching || isWalletsLoading || isWalletsFetching;

  if (isError || isWalletsError) {
    Alert.alert(errorStrings.general, errorStrings.tryAgain);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.balanceContainer}>
          <Label style={styles.walletName}>{walletName}</Label>
          <Label style={styles.balanceText}>Available balance</Label>
          <Label style={styles.balanceValue}>{formatDecimalDigits(userBalance)}</Label>
          <AppActivityIndicator isLoading={isDataLoading} />
        </View>
        <RecentTransactions
          isLoading={isDataLoading}
          transactions={transactions}
          title='Recent transactions'
          nullScreen={<BalanceTransactionNullScreen />}
        />
      </ScrollView>
      <AddButton />
    </>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  balanceContainer: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  balanceText: {
    textAlign: "center",
    color: colors.grey2,
  },
  balanceValue: {
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
});
