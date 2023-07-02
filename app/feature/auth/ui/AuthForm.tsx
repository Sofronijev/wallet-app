import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Label from "components/Label";
import LabelInput from "components/LabelInput";
import CustomButton from "components/CustomButton";
import colors from "constants/colors";
import InputErrorLabel from "components/InputErrorLabel";
import { authStrings } from "constants/strings";

type AuthFormProps = {
  onSubmit: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signUp?: boolean;
  isError?: boolean;
  errorText?: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  signUp = false,
  isError = false,
  errorText,
}) => {
  // Want to validateOnChange only if user already tried to submit
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);

  const authValidationSchema = Yup.object({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
    passwordConfirm: signUp
      ? Yup.string().oneOf([Yup.ref("password")], "Passwords must match")
      : Yup.string(),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", passwordConfirm: "" }}
      onSubmit={onSubmit}
      validationSchema={authValidationSchema}
      validateOnChange={hasSubmittedForm}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View>
          <Label style={styles.text}>{signUp ? authStrings.registerTitle : authStrings.loginTitle}</Label>
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
          {signUp && (
            <>
              <LabelInput
                style={styles.input}
                icon={<Ionicons name='ios-key-outline' size={24} color={colors.greenMint} />}
                placeholder='Confirm password'
                secureTextEntry
                value={values.passwordConfirm}
                onChangeText={handleChange("passwordConfirm")}
                autoCapitalize='none'
              />
              <InputErrorLabel text={errors.passwordConfirm} isVisible={!!errors.password} />
            </>
          )}
          <CustomButton
            title={signUp ? authStrings.signUp : authStrings.logIn}
            style={styles.button}
            onPress={() => {
              setHasSubmittedForm(true);
              handleSubmit();
            }}
          />
          <View style={styles.submitError}>
            <InputErrorLabel text={errorText} isVisible={isError && !!errorText} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
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
