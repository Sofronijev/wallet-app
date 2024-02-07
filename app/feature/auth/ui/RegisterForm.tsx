import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import colors from "constants/colors";
import AppActivityIndicator from "components/AppActivityIndicator";
import AuthForm from "./AuthForm";
import { useRegisterUserMutation } from "app/middleware/auth";
import authStorage from "modules/authStorage";
import { setUserData } from "store/reducers/userSlice";
import { errorStrings } from "constants/strings";
import { useAppDispatch } from "store/hooks";

const RegisterForm: React.FC = () => {
  const [tryRegisterUser, { isLoading, isError }] = useRegisterUserMutation();
  const [submitError, setSubmitError] = useState("");
  const dispatch = useAppDispatch();

  // TODO - use some notification that account is created - because it immediately opens app
  const onRegister = async ({ email, password }: { email: string; password: string }) => {
    try {
      const userData = await tryRegisterUser({ email, password }).unwrap();
      if (userData) {
        const {token, ...restUserData} = userData;
        authStorage.storeRefreshToken(token.refreshToken);
        authStorage.storeAccessToken(token.accessToken);
        // Had to manually dispatch action because addMatcher in userSlice was causing some issues with require circle
        //https://stackoverflow.com/questions/55664673/require-cycles-are-allowed-but-can-result-in-uninitialized-values-consider-ref
        dispatch(setUserData(restUserData));
      }
    } catch (err) {
      setSubmitError(err?.data?.message ?? errorStrings.unknown);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <AuthForm onSubmit={onRegister} signUp isError={isError} errorText={submitError} />
      <AppActivityIndicator isLoading={isLoading} />
    </KeyboardAvoidingView>
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
