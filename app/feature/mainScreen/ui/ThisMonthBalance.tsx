import { StyleSheet, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";
import { getCurrentMonthYear } from "modules/timeAndDate";
import { formatDecimalDigits } from "modules/numbers";
import { getMonthlyBalance } from "store/reducers/transactionsSlice";
import { useAppSelector } from "store/hooks";

const ThisMonthBalance: React.FC = () => {
  const { income, expense } = useAppSelector(getMonthlyBalance);
  const month = getCurrentMonthYear();
  const getIncome = income ?? 0;
  const getExpense = expense ?? 0;
  const available = getIncome - getExpense;
  return (
    <View style={styles.container}>
      <Label style={styles.title}>{month}</Label>
      <View style={styles.row}>
        <Label style={styles.label}>Available:</Label>
        <Label style={[styles.balance, available < 0 && styles.redBalance]}>
          {formatDecimalDigits(available)}
        </Label>
      </View>
      <View style={styles.row}>
        <Label style={styles.label}>Income:</Label>
        <Label style={styles.transactions}>{formatDecimalDigits(getIncome)}</Label>
      </View>
      <View style={styles.row}>
        <Label style={styles.label}>Expenses:</Label>
        <Label style={styles.transactions}>{formatDecimalDigits(getExpense)}</Label>
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
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
    paddingLeft: 30,
    color: colors.black,
  },
  balance: {
    fontSize: 35,
    textAlign: "right",
    color: colors.greenMint,
    fontWeight: "bold",
  },
  redBalance: {
    color: colors.redDark,
  },
  label: {
    fontSize: 20,
    color: colors.grey2,
  },
  transactions: {
    fontSize: 30,
    textAlign: "right",
    fontWeight: "bold",
    color: colors.black,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
});
