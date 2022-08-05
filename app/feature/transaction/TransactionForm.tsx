import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Label from "components/Label";
import TransactionSwitch, { TransactionType } from "./TransactionSwitch";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelInput from "components/LabelInput";
import InputErrorLabel from "components/InputErrorLabel";

const initialFormValues = {
  amount: "",
  date: "",
  category: "",
  type: "",
};

type Props = {};

const TransactionForm: React.FC<Props> = () => {
  const [transactionType, setTransactionType] = useState(TransactionType.Expense);

  const onTypeChange = (type: TransactionType) => {
    setTransactionType(type);
  };

  const onAdd = () => {};

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
        {({ handleChange, handleSubmit, values, errors }) => (
          <View>
            <LabelInput
              placeholder='date'
              value={values.date}
              onChangeText={handleChange("date")}
            />
            <InputErrorLabel text={errors.date} isVisible={!!errors.date} />
          </View>
        )}
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
});
