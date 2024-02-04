import { Keyboard, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePickerInput from "feature/transaction/ui/DatePickerInput";
import { formatIsoDate } from "modules/timeAndDate";
import StyledLabelInput from "components/StyledLabelInput";
import InputErrorLabel from "components/InputErrorLabel";
import WalletPicker from "feature/transaction/ui/WalletPicker";
import { useAppSelector } from "store/hooks";
import { getAllWallets } from "store/reducers/wallets/selectors";
import CustomButton from "components/CustomButton";
import colors from "constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useCreateNewTransferMutation } from "app/middleware/transfers";
import { getUserId } from "store/reducers/userSlice";
import AppActivityIndicator from "components/AppActivityIndicator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppStackParamList } from "navigation/routes";

export type TransferFromInputs = {
  date: string;
  amountTo: string;
  amountFrom: string;
  walletIdTo: string;
  walletIdFrom: string;
};

export const initialTransferFormValues = {
  date: formatIsoDate(new Date()),
  amountTo: "",
  amountFrom: "",
  walletIdTo: "",
  walletIdFrom: "",
};

export const transactionValidationSchema = Yup.object({
  date: Yup.string().required().label("Date"),
  amountTo: Yup.number()
    .typeError("Please enter a valid number for the amount")
    .required("Please enter the amount to transfer")
    .label("Amount"),
  amountFrom: Yup.number()
    .typeError("Please enter a valid number for the amount")
    .required("Please enter the amount to transfer")
    .label("Amount"),
  walletIdTo: Yup.number().required("Please select the wallet").label("Wallet"),
  walletIdFrom: Yup.number()
    .required("Please select the wallet")
    .label("Wallet")
    .test("notEqual", "Can't transfer funds to the same wallet", function (value) {
      const { walletIdTo } = this.parent;
      return value !== walletIdTo;
    }),
});

const TransferForm: React.FC = () => {
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const { params } = useRoute<RouteProp<AppStackParamList, "TransferForm">>();
  const walletIdFromParam = params.walletIdFrom;

  const wallets = useAppSelector(getAllWallets);
  const userId = useAppSelector(getUserId);

  const [tryCreateNewTransfer, { isLoading }] = useCreateNewTransferMutation();

  const onTransactionSubmit = async (values: TransferFromInputs) => {
    Keyboard.dismiss();
    try {
      const transferData = {
        date: formatIsoDate(values.date),
        amountTo: Number(values.amountTo),
        amountFrom: -Number(values.amountFrom),
        walletIdTo: Number(values.walletIdTo),
        walletIdFrom: Number(values.walletIdFrom),
        userId,
      };

      await tryCreateNewTransfer(transferData).unwrap();
    } catch (error) {}
  };

  const formik = useFormik<TransferFromInputs>({
    initialValues: { ...initialTransferFormValues, walletIdFrom: `${walletIdFromParam}` },
    validationSchema: transactionValidationSchema,
    validateOnChange: hasSubmittedForm,
    onSubmit: (values) => onTransactionSubmit(values),
  });
  const onDateChange = (date: string) => {
    formik.setFieldValue("date", date);
  };
  // In case amount is negative, remove minus sign for preview
  // TODO - add validation while typing
  const formattedAmount = (amount: string) => amount.replace("-", "");

  const walletName = (walledValue: string) => wallets[walledValue]?.walletName;

  const onWalletSelect = (fieldName: string) => (walletId: number) => {
    formik.setFieldValue(fieldName, walletId);
  };

  const onSubmit = () => {
    setHasSubmittedForm(true);
    formik.handleSubmit();
  };

  return (
    <View style={styles.container}>
      <DatePickerInput
        date={new Date(formik.values.date)}
        maximumDate={new Date()}
        onDateSelect={onDateChange}
      />

      <View style={styles.row}>
        <View style={styles.flex}>
          <StyledLabelInput
            value={formattedAmount(formik.values.amountFrom)}
            placeholder='Amount sending'
            onChangeText={formik.handleChange("amountFrom")}
            keyboardType='decimal-pad'
            style={styles.input}
            icon={<FontAwesome5 name='coins' size={24} color={colors.greenMint} />}
          />
        </View>
        <View style={styles.flex}>
          <StyledLabelInput
            value={formattedAmount(formik.values.amountTo)}
            placeholder='Amount receiving'
            onChangeText={formik.handleChange("amountTo")}
            keyboardType='decimal-pad'
            style={styles.input}
            icon={<FontAwesome5 name='coins' size={24} color={colors.greenMint} />}
          />
        </View>
      </View>
      <InputErrorLabel
        text={formik.errors.amountTo || formik.errors.amountFrom}
        isVisible={!!formik.errors.amountTo || !!formik.errors.amountFrom}
      />
      <View style={styles.row}>
        <View style={styles.flex}>
          <WalletPicker
            value={walletName(formik.values.walletIdFrom)}
            style={styles.input}
            onSelect={onWalletSelect("walletIdFrom")}
          />
        </View>
        <View style={styles.flex}>
          <WalletPicker
            value={walletName(formik.values.walletIdTo)}
            style={styles.input}
            onSelect={onWalletSelect("walletIdTo")}
          />
        </View>
      </View>
      <InputErrorLabel
        text={formik.errors.walletIdFrom || formik.errors.walletIdTo}
        isVisible={!!formik.errors.walletIdFrom || !!formik.errors.walletIdTo}
      />
      <CustomButton title='Submit' onPress={onSubmit} style={styles.submitBtn} />
      <AppActivityIndicator isLoading={isLoading} />
    </View>
  );
};

export default TransferForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    columnGap: 10,
  },
  flex: {
    flex: 1,
  },
  submitBtn: {
    marginTop: 20,
  },
  input: {
    backgroundColor: colors.white,
  },
});
