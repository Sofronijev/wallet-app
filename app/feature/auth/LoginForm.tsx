import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import Label from "components/Label";
import LabelInput from "components/LabelInput";
import CustomButton from "components/CustomButton";
import AppActivityIndicator from "components/AppActivityIndicator";
import colors from "constants/colors";
import InputErrorLabel from "components/InputErrorLabel";
import ButtonText from "components/ButtonText";
import { AuthStackParamList } from "navigation/routes";
import authStorage from "modules/authStorage";
import { useLoginUserMutation } from "app/middleware/auth";
import { setUserData } from "store/reducers/userSlice";
import { useAppDispatch } from "store/hooks";

type Props = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

const LoginForm: React.FC<Props> = ({ navigation }) => {
  const [tryLoginUser, { isLoading, isError }] = useLoginUserMutation();
  // Want to validateOnChange only if user already tried to submit
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
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
      setSubmitError(err?.data?.message ?? "Unknown error occurred");
    }
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onLogin}
      validationSchema={loginValidationSchema}
      validateOnChange={hasSubmittedForm}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Label style={styles.text}>Welcome</Label>
          <LabelInput
            icon={<FontAwesome name='user-o' size={24} color={colors.greenMint} />}
            placeholder='Email'
            keyboardType='email-address'
            value={values.email}
            onChangeText={handleChange("email")}
            autoCapitalize='none'
          />
          <InputErrorLabel text={errors.email} isVisible={!!errors.email} />
          <LabelInput
            style={styles.input}
            icon={<Ionicons name='ios-key-outline' size={24} color={colors.greenMint} />}
            placeholder='Password'
            secureTextEntry
            value={values.password}
            onChangeText={handleChange("password")}
            autoCapitalize='none'
          />
          <InputErrorLabel text={errors.password} isVisible={!!errors.password} />
          <CustomButton
            title='Log in'
            style={styles.button}
            onPress={() => {
              setHasSubmittedForm(true);
              handleSubmit();
            }}
          />
          <View style={styles.submitError}>
            <InputErrorLabel text={submitError} isVisible={isError && !!submitError} />
          </View>
          <ButtonText
            title='Register'
            onPress={() => navigation.navigate("Register")}
            style={styles.register}
          />
          <AppActivityIndicator isLoading={isLoading} />
        </View>
      )}
    </Formik>
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
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 30,
    letterSpacing: 1,
    color: colors.greenMint,
  },
  input: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  button: {
    marginTop: 40,
  },
  register: {
    alignSelf: "center",
    marginTop: 30,
  },
  submitError: {
    alignItems: "center",
  },
});
