import { StyleSheet, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "constants/colors";
import AppActivityIndicator from "components/AppActivityIndicator";
import Label from "components/Label";

type BalanceTransactionNullScreenProps = {
  isLoading?: boolean;
};

const BalanceTransactionNullScreen: React.FC<BalanceTransactionNullScreenProps> = ({
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='finance' size={100} color={colors.greyNullScreen} />
      <Label style={styles.title}>Let's Get Started!</Label>
      <Label style={styles.description}>
        Start tracking your expenses and incomes to gain better control of your finances. Tap the
        plus sign (+) button to add your first transaction and begin your financial journey with us!
      </Label>
      <AppActivityIndicator isLoading={isLoading} hideScreen />
    </View>
  );
};

export default BalanceTransactionNullScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  title: {
    fontWeight: "bold",
    paddingVertical: 12,
    fontSize: 16,
  },
  description: {
    paddingHorizontal: 16,
  },
});
