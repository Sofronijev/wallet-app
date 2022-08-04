import { StyleSheet, View } from "react-native";
import React from "react";
import CustomButton from "components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";

const AddTransactions: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  return (
    <View style={styles.container}>
      <CustomButton style={styles.button} title='Add income' onPress={() => {}} />
      <CustomButton style={styles.button} title='Add expense' onPress={() => navigation.navigate('Expense')} />
    </View>
  );
};

export default AddTransactions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 10,
  },
});
