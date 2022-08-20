import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import ThisMonthBalance from "feature/mainScreen/ui/ThisMonthBalance";
import RecentTransactions from "feature/mainScreen/ui/RecentTransactions";
import colors from "constants/colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";
import CustomButton from "components/CustomButton";
import { useGetMonthlyUserTransactionsMutation } from "api/apiSlice";
import { formatIsoDate } from "modules/timeAndDate";

type MainScreenProps = {
  navigation: StackNavigationProp<AppStackParamList>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const [tryGetTransactions, { isLoading, isError, data }] = useGetMonthlyUserTransactionsMutation();
  // TODO - fix this component and its children
  const request = {
    user_id: 1,
    start: 0,
    count: 10,
    date: formatIsoDate(new Date()),
  };
  useEffect(() => {
    tryGetTransactions(request);
  }, []);
  console.log(request, data)
  return (
    <ScrollView style={styles.container}>
      <ThisMonthBalance income={data?.income} expense={data?.expense} />
      <CustomButton
        style={styles.button}
        title='New transaction'
        onPress={() => navigation.navigate("Transaction")}
      />
      <RecentTransactions data={data?.transactions}/>
    </ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  button: {
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
