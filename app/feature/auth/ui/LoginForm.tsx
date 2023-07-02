import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import AppActivityIndicator from "components/AppActivityIndicator";
import colors from "constants/colors";
import ButtonText from "components/ButtonText";
import { AuthStackParamList } from "navigation/routes";
import authStorage from "modules/authStorage";
import { useLoginUserMutation } from "app/middleware/auth";
import { setUserData } from "store/reducers/userSlice";
import { useAppDispatch } from "store/hooks";
import { errorStrings } from "constants/strings";
import AuthForm from "./AuthForm";

type Props = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const LoginForm: React.FC<Props> = ({ navigation }) => {
  const [tryLoginUser, { isLoading, isError }] = useLoginUserMutation();
  const [submitError, setSubmitError] = useState("");
  const dispatch = useAppDispatch();

  const onLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const userData = await tryLoginUser({ email, password }).unwrap();
      if (userData) {
        authStorage.storeRefreshToken(userData.token.refreshToken);
        authStorage.storeAccessToken(userData.token.accessToken);
        // Had to manually dispatch action because addMatcher in userSlice was causing some issues with require circle
        //https://stackoverflow.com/questions/55664673/require-cycles-are-allowed-but-can-result-in-uninitialized-values-consider-ref
        dispatch(setUserData(userData.data));
      }
    } catch (err) {
      setSubmitError(err?.data?.message ?? errorStrings.unknown);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthForm onSubmit={onLogin} isError={isError} errorText={submitError} />
      <ButtonText
        title='Register'
        onPress={() => navigation.navigate("Register")}
        style={styles.register}
      />
      <AppActivityIndicator isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: colors.white,
  },
  register: {
    alignSelf: "center",
    marginTop: 30,
  },
});
