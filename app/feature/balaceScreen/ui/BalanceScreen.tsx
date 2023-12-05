import { Alert, StyleSheet, View } from "react-native";
import React from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import { useGetUserRecentTransactionsQuery } from "app/middleware/transactions";
import { getUserRecentTransactions } from "store/reducers/balance/selectors";
import { errorStrings } from "constants/strings";
import AddButton from "components/AddButton";
import { getActiveWallet } from "store/reducers/wallets/selectors";
import WalletList from "feature/wallet/ui/WalletList";
import { ScrollView } from "react-native-gesture-handler";
import RecentTransactions from "feature/monthlyScreen/ui/RecentTransactions";

const BalanceScreen: React.FC = () => {
  const userId = useAppSelector(getUserId);

  const transactions = useAppSelector(getUserRecentTransactions);
  const activeWallet = useAppSelector(getActiveWallet);
  const walletId = activeWallet?.walletId;

  const { isError, isLoading, isFetching } = useGetUserRecentTransactionsQuery(
    userId && walletId
      ? {
          userId,
          walletIds: [walletId],
        }
      : skipToken,
    { refetchOnMountOrArgChange: true }
  );
  const isTransactionLoading = isLoading || isFetching;

  if (isError) {
    Alert.alert(errorStrings.general, errorStrings.tryAgain);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <WalletList />
        <View style={{ marginHorizontal: 16 }}>
          <RecentTransactions
            transactions={transactions}
            isLoading={isTransactionLoading}
            title='Recent transactions'
          />
        </View>
      </ScrollView>
      <AddButton />
    </>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
});
