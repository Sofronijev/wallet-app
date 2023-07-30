import { StyleSheet, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";
import TransactionsRow from "./TransactionsRow";
import { TransactionType } from "store/reducers/transactionsSlice";
import AppActivityIndicator from "components/AppActivityIndicator";

type RecentTransactionsProps = {
  isLoading: boolean;
  transactions: TransactionType[];
  title: string;
  nullScreen?: JSX.Element;
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  isLoading,
  transactions,
  title,
  nullScreen,
}) => {
  const hasTransactions = false;

  const renderTransactions = hasTransactions
    ? transactions?.map((transaction) => (
        <TransactionsRow key={transaction.id} transaction={transaction} />
      ))
    : nullScreen;

  const renderLoading = (
    <View style={styles.loadingContainer}>
      <AppActivityIndicator isLoading={true} hideScreen />
    </View>
  );
  return (
    <View style={styles.container}>
      <Label style={styles.title}>{title}</Label>
      {isLoading ? renderLoading : renderTransactions}
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  loadingContainer: {
    paddingTop: 50,
  },
  title: {
    color: colors.black,
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: "500",
  },
});
