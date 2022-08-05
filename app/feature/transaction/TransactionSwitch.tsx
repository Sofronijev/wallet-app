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
  fontSize: 22,
  borderWidth: 1,
  borderColor: colors.grey,
  paddingHorizontal: 12,
  paddingVertical: 5,
  textAlign: "center",
  color: colors.grey,
  textTransform: 'capitalize',
};

const TransactionSwitch: React.FC<Props> = ({ value, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.flex} onPress={() => onPress(TransactionType.Income)}>
        <Label
          style={[styles.incomeBubble, value === TransactionType.Income && styles.activeBubble]}
        >
          {TransactionType.Income}
        </Label>
      </TouchableOpacity>
      <TouchableOpacity style={styles.flex} onPress={() => onPress(TransactionType.Expense)}>
        <Label
          style={[styles.expenseBubble, value === TransactionType.Expense && styles.activeBubble]}
        >
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
  flex: {
    flex: 1,
  },
  activeBubble: {
    color: colors.white,
    backgroundColor: colors.greenMint,
    borderColor: colors.greenMint,
  },
});
