import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "constants/colors";
import AppActivityIndicator from "components/AppActivityIndicator";
import AuthForm from "./AuthForm";

const RegisterForm: React.FC = () => {
  return (
    <View style={styles.container}>
      <AuthForm
        onSubmit={undefined}
        signUp
      />
      <AppActivityIndicator isLoading={false} />
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: colors.white,
    paddingBottom: 50,
  },
});
