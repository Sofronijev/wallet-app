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
import NullScreen from "components/NullScreen";

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
        <View style={styles.transactionsContainer}>
          <RecentTransactions
            transactions={transactions}
            isLoading={isTransactionLoading}
            title='Recent transactions'
            nullScreen={
              <NullScreen
                isLoading={isTransactionLoading}
                title='There are no transactions for this wallet'
                icon='wallet'
              />
            }
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
  transactionsContainer: {
    marginHorizontal: 16,
  }
});
