import { Keyboard, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelInput from "components/LabelInput";
import InputErrorLabel from "components/InputErrorLabel";
import DatePickerInput from "feature/transaction/DatePickerInput";
import CustomButton from "components/CustomButton";
import TransactionBottomSheet from "./ui/TransactionBottomSheet";
import { Category, Transaction } from "modules/transactionCategories";
import { TransactionBottomSheetType } from "./modules/transactionBottomSheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "constants/colors";
import TextBox from "components/TextBox";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import {
  CreateTransactionRequest,
  useCreateNewTransactionMutation,
  useGetAllUserTransactionsMutation,
} from "api/apiSlice";

const initialFormValues = {
  amount: "",
  category: "",
  type: "",
};

type Props = {};

export type TransactionBottomSheet = React.ElementRef<typeof TransactionBottomSheet>;

const TransactionForm: React.FC<Props> = () => {
  const [date, setDate] = useState(new Date());
  const sheetRef = useRef<TransactionBottomSheetType>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [type, setType] = useState<Transaction | null>(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [tryCreateNewTransaction, { isLoading, isError }] = useCreateNewTransactionMutation();
  const createNewTransaction = async (data: CreateTransactionRequest) => {
    try {
      const res = await tryCreateNewTransaction(data).unwrap();
      console.log({ res });
    } catch (err) {
      console.log({ err });
    }
  };

  const onAdd = () => {
    createNewTransaction({
      amount: Number(amount),
      description,
      date,
      user_id: 1,
      type_id: type?.id,
      category_id: category?.id,
    });
  };

  const onSelectCategory = (category: Category, type: Transaction) => {
    setCategory(category);
    setType(type);
  };

  const setCategoryText = () => {
    if (!category && !type) {
      return "";
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
      <DatePickerInput date={date} maximumDate={new Date()} onDateSelect={setDate} />
      <LabelInput
        value={amount}
        placeholder='Amount'
        onChangeText={setAmount}
        keyboardType='decimal-pad'
        style={styles.marginTop}
        icon={<FontAwesome5 name='coins' size={24} color={colors.black} />}
        autoFocus
      />
      {/* <InputErrorLabel text={errors.amount} isVisible={!!errors.amount} /> */}
      <TouchableOpacity onPress={openSheet}>
        <LabelInput
          value={setCategoryText()}
          icon={<MaterialIcons name='category' size={24} color={colors.black} />}
          disabled
          placeholder='Category'
          style={styles.marginTop}
          inputStyle={styles.category}
        />
      </TouchableOpacity>
      <TextBox
        placeholder='Transaction comment'
        style={styles.marginTop}
        numberOfLines={6}
        maxLength={300}
        value={description}
        onChangeText={setDescription}
      />
      <CustomButton title='Submit' onPress={onAdd} style={styles.marginTop} />
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
  marginTop: {
    marginTop: 30,
  },
  category: {
    color: colors.black,
  },
});
