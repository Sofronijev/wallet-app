import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";

export enum TransactionType {
  Income = "income",
  Expense = "expense",
}

type Props = {
  value: TransactionType;
  onPress: (type: TransactionType) => void;
};

const bubbleSharedStyle: StyleProp<TextStyle> = {
  flex: 1,
  borderWidth: 1,
  borderColor: colors.grey,
  paddingHorizontal: 12,
  paddingVertical: 5,
};

const TransactionSwitch: React.FC<Props> = ({ value, onPress }) => {
  const isExpense = value === TransactionType.Expense;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.incomeBubble, !isExpense && styles.activeBubble]}
        onPress={() => onPress(TransactionType.Income)}
      >
        <Label style={[styles.bubble, !isExpense && styles.activeText]}>
          {TransactionType.Income}
        </Label>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.expenseBubble, isExpense && styles.activeBubble]}
        onPress={() => onPress(TransactionType.Expense)}
      >
        <Label style={[styles.bubble, isExpense && styles.activeText]}>
          {TransactionType.Expense}
        </Label>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  incomeBubble: {
    ...bubbleSharedStyle,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRightWidth: 0,
  },
  expenseBubble: {
    ...bubbleSharedStyle,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftWidth: 0,
  },
  bubble: {
    fontSize: 22,
    color: colors.grey,
    textAlign: "center",
    textTransform: "capitalize",
  },
  activeBubble: {
    backgroundColor: colors.greenMint,
    borderColor: colors.greenMint,
  },
  activeText: {
    color: colors.white,
  },
});
