import { StyleSheet, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";
import TransactionsRow from "./TransactionsRow";

type Props = {};

const RecentTransactions: React.FC = () => {
  return (
    <View style={styles.container}>
      <Label style={styles.title}>Recent transactions</Label>
      <TransactionsRow />
      <TransactionsRow />
      <TransactionsRow />
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  title: {
    color: colors.grey2,
    fontSize: 18,
    paddingBottom: 10,
  },
});
