import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TransactionSwitch, { TransactionType } from "./TransactionSwitch";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelInput from "components/LabelInput";
import InputErrorLabel from "components/InputErrorLabel";
import DatePickerInput from "feature/transaction/DatePickerInput";
import CustomButton from "components/CustomButton";

const initialFormValues = {
  amount: "",
  category: "",
  type: "",
};

type Props = {};

const TransactionForm: React.FC<Props> = () => {
  const [transactionType, setTransactionType] = useState(TransactionType.Expense);
  const [date, setDate] = useState(new Date());
  const onTypeChange = (type: TransactionType) => {
    setTransactionType(type);
  };

  const onAdd = (data: any) => {
    console.log(data);
  };

  const loginValidationSchema = Yup.object({
    amount: Yup.number().required().label("Amount"),
    category: Yup.string().required().label("Category"),
    type: Yup.string().required().label("Type"),
  });

  return (
    <View style={styles.container}>
      <TransactionSwitch value={transactionType} onPress={onTypeChange} />
      <View style={styles.input}>
        <DatePickerInput date={date} maximumDate={new Date()} onDateSelect={setDate} />
      </View>
      <Formik
        initialValues={initialFormValues}
        onSubmit={onAdd}
        validationSchema={loginValidationSchema}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View>
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
