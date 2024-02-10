import { Alert, FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { getUserId } from "store/reducers/userSlice";
import { useAppSelector } from "store/hooks";
import {
  useSearchTransactionsMoreMutation,
  useSearchTransactionsQuery,
} from "app/middleware/transactions";
import TransactionsRow from "components/TransactionRow";
import { TransactionType } from "store/reducers/monthlyBalance/monthlyBalanceSlice";
import {
  getSearchedTransactions,
  getSearchedTransactionsCount,
} from "store/reducers/transactionSearch/selectors";
import AppActivityIndicator from "components/AppActivityIndicator";
import { errorStrings } from "constants/strings";
import colors from "constants/colors";
import NullScreen from "components/NullScreen";
import { getActiveWallet } from "store/reducers/wallets/selectors";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const TransactionSearch = () => {
  const userId = useAppSelector(getUserId);
  const activeWallet = useAppSelector(getActiveWallet);
  const walletId = activeWallet?.walletId;

  const { isLoading, isError, isFetching } = useSearchTransactionsQuery(
    userId && walletId
      ? {
          userId,
          walletIds: [walletId],
        }
      : skipToken
  );

  const [tryTransactionSearchMore, { isLoading: isLoadingMore }] =
    useSearchTransactionsMoreMutation();

  const transactions = useAppSelector(getSearchedTransactions);
  const count = useAppSelector(getSearchedTransactionsCount);
  const transactionNumber = transactions.length;

  if (isError) {
    Alert.alert(errorStrings.general, errorStrings.tryAgain);
  }

  const searchMoreTransactions = () => {
    if (transactionNumber < count && walletId) {
      tryTransactionSearchMore({
        userId,
        walletIds: [walletId],
        start: transactionNumber,
      });
    }
  };

  if (!transactionNumber) {
    return (
      <NullScreen
        icon='wallet'
        isLoading={isFetching || isLoading}
        title='No transactions added'
        subtitle='Start tracking your expenses and incomes to gain better control of your finances'
      />
    );
  }

  const renderItem = ({ item }: { item: TransactionType }) => (
    <TransactionsRow key={item.id} transaction={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        style={styles.flatList}
        onEndReached={searchMoreTransactions}
        onEndReachedThreshold={0.1}
      />
      <AppActivityIndicator isLoading={isFetching || isLoading || isLoadingMore} />
    </View>
  );
};

export default TransactionSearch;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  flatList: {
    paddingHorizontal: 16,
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
