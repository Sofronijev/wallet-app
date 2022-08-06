import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Label from "components/Label";
import TransactionSwitch, { TransactionType } from "./TransactionSwitch";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelInput from "components/LabelInput";
import InputErrorLabel from "components/InputErrorLabel";
import DatePickerInput from "feature/transaction/DatePickerInput";
import CustomButton from "components/CustomButton";

const initialFormValues = {
  amount: "",
  date: new Date(),
  category: "",
  type: "",
};

type Props = {};

const TransactionForm: React.FC<Props> = () => {
  const [transactionType, setTransactionType] = useState(TransactionType.Expense);

  const onTypeChange = (type: TransactionType) => {
    setTransactionType(type);
  };

  const onAdd = (data: any) => {
    console.log(data);
  };

  const loginValidationSchema = Yup.object({
    amount: Yup.number().required().label("Amount"),
    date: Yup.date().required().label("Date"),
    category: Yup.string().required().label("Category"),
    type: Yup.string().required().label("Type"),
  });

  return (
    <View style={styles.container}>
      <TransactionSwitch value={transactionType} onPress={onTypeChange} />
      <Formik
        initialValues={initialFormValues}
        onSubmit={onAdd}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => {
          const setDate = (date: Date) => setFieldValue("date", date);
          return (
            <View>
              <View style={styles.input}>
                <DatePickerInput
                  date={values.date}
                  maximumDate={new Date()}
                  onDateSelect={setDate}
                />
              </View>
              <LabelInput
                placeholder='Enter amount'
                value={values.amount}
                onChangeText={handleChange("amount")}
                keyboardType='decimal-pad'
                style={styles.input}
              />
              <InputErrorLabel text={errors.amount} isVisible={!!errors.amount} />
              <CustomButton title='Submit' onPress={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default TransactionForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  input: {
    marginTop: 20,
  },
});
