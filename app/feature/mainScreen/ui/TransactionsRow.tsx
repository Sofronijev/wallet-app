import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "constants/colors";
import Label from "components/Label";

type Props = {
  transaction: any;
};

const TransactionsRow: React.FC<Props> = ({ transaction }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name='food-apple-outline' size={40} color={colors.grey2} />
      </View>
      <View>
        <Label>{`${transaction.date} - Groceries`}</Label>
        <Label>{transaction.description}</Label>
      </View>
      <Label style={styles.price}>{transaction.amount}</Label>
    </View>
  );
};

export default TransactionsRow;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 5,
    justifyContent: "space-around",
  },
  icon: {},
  price: {
    fontSize: 20,
  },
});
