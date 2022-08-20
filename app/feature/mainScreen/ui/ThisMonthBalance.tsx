import { StyleSheet, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";

type Props = {};

const ThisMonthBalance: React.FC = () => {
  return (
    <View style={styles.container}>
      <Label style={styles.title}>This month balance</Label>
      <View style={styles.row}>
        <Label style={styles.label}>Available:</Label>
        <Label style={styles.balance}>50.250,00</Label>
      </View>
      <View style={styles.row}>
        <Label style={styles.label}>Expenses:</Label>
        <Label style={styles.expenses}>-30.150,00</Label>
      </View>
    </View>
  );
};

export default ThisMonthBalance;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 20,
    paddingLeft: 30,
    color: colors.grey2,
  },
  balance: {
    fontSize: 35,
    textAlign: "right",
    color: colors.greenMint,
  },
  label: {
    fontSize: 20,
    color: colors.grey2,
  },
  expenses: {
    fontSize: 30,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
});
