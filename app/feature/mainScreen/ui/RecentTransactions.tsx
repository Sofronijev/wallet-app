import { StyleSheet, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";
import TransactionsRow from "./TransactionsRow";
import { useAppSelector } from "store/hooks";
import { getMonthlyTransactions } from "store/reducers/transactionsSlice";

const RecentTransactions: React.FC = () => {
  const transactions = useAppSelector(getMonthlyTransactions);
  return (
    <View>
      <Label style={styles.title}>Recent transactions</Label>
      {transactions?.map((transaction) => (
        <TransactionsRow key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  title: {
    color: colors.grey2,
    fontSize: 18,
    paddingBottom: 10,
  },
});
