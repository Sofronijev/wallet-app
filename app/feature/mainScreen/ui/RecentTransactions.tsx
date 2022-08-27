import { StyleSheet, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";
import TransactionsRow from "./TransactionsRow";
import { useAppSelector } from "store/hooks";
import { getMonthlyTransactions } from "store/reducers/transactionsSlice";
import AppActivityIndicator from "components/AppActivityIndicator";

type RecentTransactionsProps = {
  isLoading: boolean;
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ isLoading }) => {
  const transactions = useAppSelector(getMonthlyTransactions);

  const renderTransactions = transactions?.map((transaction) => (
    <TransactionsRow key={transaction.id} transaction={transaction} />
  ));

  const renderLoading = (
    <View style={styles.loadingContainer}>
      <AppActivityIndicator isLoading={isLoading} hideScreen />
    </View>
  );
  return (
    <View>
      <Label style={styles.title}>Recent transactions</Label>
      {isLoading ? renderLoading : renderTransactions}
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  loadingContainer: {
    paddingTop: 50,
  },
  title: {
    color: colors.grey2,
    fontSize: 18,
    paddingBottom: 10,
  },
});
