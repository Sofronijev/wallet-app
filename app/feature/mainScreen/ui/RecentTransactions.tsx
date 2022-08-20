import { StyleSheet, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";
import TransactionsRow from "./TransactionsRow";

type Props = { data?: any[] };

const RecentTransactions: React.FC<Props> = ({ data }) => {
  return (
    <View>
      <Label style={styles.title}>Recent transactions</Label>
      {data?.map((transaction) => (
        <TransactionsRow key={transaction.id} transaction={transaction}/>
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
