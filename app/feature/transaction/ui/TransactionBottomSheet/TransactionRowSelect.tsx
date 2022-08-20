import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Category, Transaction } from "modules/transactionCategories";
import CategoryIcon from "components/CategoryIcon";

type Props = {
  item: Transaction | Category;
  onPress: (item: Transaction | Category) => void;
  hideIcon?: boolean;
};

const TransactionRowSelect: React.FC<Props> = ({ item, onPress, hideIcon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      {!hideIcon && <CategoryIcon categoryName={item.name} />}
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );
};

export default TransactionRowSelect;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  label: {
    fontSize: 18,
    paddingVertical: 15,
    paddingLeft: 16,
  },
});
