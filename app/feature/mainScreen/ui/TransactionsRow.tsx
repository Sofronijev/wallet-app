import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "constants/colors";
import Label from "components/Label";

type Props = {};

const TransactionsRow: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name='food-apple-outline' size={40} color={colors.grey2} />
      </View>
      <View>
        <Label>05.05.2022. - Groceries</Label>
        <Label>Maxi</Label>
      </View>
      <Label style={styles.price}>-5.000,00</Label>
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
