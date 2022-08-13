import { Keyboard, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import TransactionSwitch, { TransactionType } from "./TransactionSwitch";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelInput from "components/LabelInput";
import InputErrorLabel from "components/InputErrorLabel";
import DatePickerInput from "feature/transaction/DatePickerInput";
import CustomButton from "components/CustomButton";
import TransactionBottomSheet from "./ui/TransactionBottomSheet";
import { Category, Transaction } from "modules/transactionCategories";
import { TransactionBottomSheetType } from "./modules/transactionBottomSheet";
import Label from "components/Label";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "constants/colors";
import TextBox from "components/TextBox";

const initialFormValues = {
  amount: "",
  category: "",
  type: "",
};

type Props = {};

export type TransactionBottomSheet = React.ElementRef<typeof TransactionBottomSheet>;

const TransactionForm: React.FC<Props> = () => {
  const [transactionType, setTransactionType] = useState(TransactionType.Expense);
  const [date, setDate] = useState(new Date());
  const sheetRef = useRef<TransactionBottomSheetType>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [type, setType] = useState<Transaction | null>(null);
  const [amount, setAmount] = useState('');

  const onTypeChange = (type: TransactionType) => {
    setTransactionType(type);
  };

  const onAdd = () => {
    console.log('ADD');
  };

  const onSelectCategory = (category: Category, type: Transaction) => {
    setCategory(category);
    setType(type);
  };

  const setCategoryText = () => {
    if (!category && !type) {
      return "Select";
    }
    return `${category?.label}, ${type?.label}`;
  };

  const openSheet = () => {
    if (sheetRef?.current) {
      Keyboard.dismiss();
      sheetRef?.current?.openSheet();
    }
  };

  // const loginValidationSchema = Yup.object({
  //   amount: Yup.number().required().label("Amount"),
  // });

  return (
    <View style={styles.container}>
      <TransactionSwitch value={transactionType} onPress={onTypeChange} />
      <View style={styles.input}>
        <DatePickerInput date={date} maximumDate={new Date()} onDateSelect={setDate} />
      </View>
      <View>
        <View style={styles.categoryContainer}>
          <Label style={styles.text}>Category</Label>
          <TouchableOpacity onPress={openSheet}>
            <Label style={[styles.text, styles.hyperlink]}>{setCategoryText()}</Label>
          </TouchableOpacity>
        </View>
        <LabelInput
          placeholder='Enter amount'
          value={amount}
          onChangeText={setAmount}
          keyboardType='decimal-pad'
          style={styles.input}
        />
        {/* <InputErrorLabel text={errors.amount} isVisible={!!errors.amount} /> */}
        <TextBox placeholder="Transaction comment" style={styles.input}/>
        <CustomButton title='Submit' onPress={onAdd} style={styles.input}/>
      </View>
      <TransactionBottomSheet ref={sheetRef} onSelect={onSelectCategory} />
    </View>
  );
};

export default TransactionForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  input: {
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
  hyperlink: {
    color: colors.hyperlink,
  },
});
