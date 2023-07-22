import { StyleSheet, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";
import CustomButton from "components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";

const BalanceScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Label style={styles.balanceText}>Available balance</Label>
        <Label style={styles.balanceValue}>500.000,00</Label>
      </View>
      <CustomButton
        style={styles.button}
        title='New transaction'
        onPress={() => navigation.navigate("Transaction")}
      />
    </View>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  balanceContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  balanceText: {
    textAlign: "center",
    color: colors.grey2,
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginVertical: 20,
  },
});
