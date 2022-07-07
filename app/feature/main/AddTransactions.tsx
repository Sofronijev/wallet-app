import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "components/CustomButton";

type Props = {};

const AddTransactions: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomButton style={styles.button} title='Add income' onPress={() => {}} />
      <CustomButton style={styles.button} title='Add expense' onPress={() => {}} />
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
