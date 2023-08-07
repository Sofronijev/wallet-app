import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getUserId } from "store/reducers/userSlice";
import { useAppSelector } from "store/hooks";
import {
  useSearchTransactionsMoreMutation,
  useSearchTransactionsQuery,
} from "app/middleware/transactions";
import Label from "components/Label";
import TransactionsRow from "feature/monthlyScreen/ui/TransactionsRow";
import { TransactionType } from "store/reducers/monthlyBalance/monthlyBalanceSlice";
import {
  getSearchedTransactions,
  getSearchedTransactionsCount,
} from "store/reducers/transactionSearch/selectors";
import AppActivityIndicator from "components/AppActivityIndicator";
import { errorStrings } from "constants/strings";
import colors from "constants/colors";
import NullScreen from "components/NullScreen";

const TransactionSearch = () => {
  const userId = useAppSelector(getUserId);
  const { isLoading, isError, isFetching } = useSearchTransactionsQuery({
    userId,
  });
  const [tryTransactionSearchMore, { isLoading: isLoadingMore }] =
    useSearchTransactionsMoreMutation();

  const transactions = useAppSelector(getSearchedTransactions);
  const count = useAppSelector(getSearchedTransactionsCount);
  const transactionNumber = transactions.length;

  if (isError) {
    Alert.alert(errorStrings.general, errorStrings.tryAgain);
  }

  const searchMoreTransactions = () => {
    if (transactionNumber < count) {
      tryTransactionSearchMore({
        userId,
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
      <Label style={styles.text}>All transactions</Label>
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
