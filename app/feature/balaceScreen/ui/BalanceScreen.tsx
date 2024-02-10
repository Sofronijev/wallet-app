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
import RecentTransactions from "feature/balaceScreen/ui/RecentTransactions";
import NullScreen from "components/NullScreen";
import { useSetWalletStartingBalanceMutation } from "app/middleware/wallets";
import { showStartingBalancePrompt } from "feature/settingsScreen/modules";
import MonthlyBalance from "./MonthlyBalance";

const BalanceScreen: React.FC = () => {
  const userId = useAppSelector(getUserId);

  const transactions = useAppSelector(getUserRecentTransactions);
  const activeWallet = useAppSelector(getActiveWallet);
  const walletId = activeWallet?.walletId;
  const hasStartingBalance = !!activeWallet?.startingBalance;

  const { isError, isLoading, isFetching } = useGetUserRecentTransactionsQuery(
    userId && walletId
      ? {
          userId,
          walletIds: [walletId],
        }
      : skipToken,
    { refetchOnMountOrArgChange: true }
  );
  const [trySetStartingBalance, { isLoading: isStartingBalanceLoading }] =
    useSetWalletStartingBalanceMutation();

  const isTransactionLoading = isLoading || isFetching || isStartingBalanceLoading;

  if (isError) {
    Alert.alert(errorStrings.general, errorStrings.tryAgain);
  }

  const onChangeStartingBalance = () => {
    if (!walletId) return;
    showStartingBalancePrompt((text: string) =>
      trySetStartingBalance({
        walletId,
        userId,
        // TODO - format, validate number
        value: parseFloat(text),
      })
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <WalletList />
        <View style={styles.itemContainer}>
          <MonthlyBalance />
        </View>
        <View style={styles.itemContainer}>
          <RecentTransactions
            transactions={transactions}
            isLoading={isTransactionLoading}
            title='Recent transactions'
            nullScreen={
              <NullScreen
                isLoading={isTransactionLoading}
                title='No transactions'
                subtitle='Tap the plus sign (+) button to start tracking your expenses and incomes to gain better control of your finances.'
                icon='wallet'
                buttonText={hasStartingBalance ? undefined : "Add starting balance"}
                onPress={onChangeStartingBalance}
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
  itemContainer: {
    marginHorizontal: 16,
  },
});
