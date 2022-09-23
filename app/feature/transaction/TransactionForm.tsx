import { Alert, Keyboard, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import LabelInput from "components/LabelInput";
import InputErrorLabel from "components/InputErrorLabel";
import DatePickerInput from "feature/transaction/ui/DatePickerInput";
import CustomButton from "components/CustomButton";
import TransactionBottomSheet from "./ui/TransactionBottomSheet";
import { Category, Transaction } from "modules/transactionCategories";
import { TransactionBottomSheetType } from "./modules/transactionBottomSheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "constants/colors";
import TextBox from "components/TextBox";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { formatIsoDate } from "modules/timeAndDate";
import AppActivityIndicator from "components/AppActivityIndicator";
import { useCreateNewTransactionMutation } from "app/middleware/transactions";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";
import { initialTransactionFormValues, TransactionFromInputs, transactionValidationSchema } from "./modules/formValidation";

type Props = {
  navigation: StackNavigationProp<AppStackParamList>;
};

const TransactionForm: React.FC<Props> = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const sheetRef = useRef<TransactionBottomSheetType>(null);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [tryCreateNewTransaction, { isLoading }] = useCreateNewTransactionMutation();

  const onTransactionAdd = async (values: TransactionFromInputs) => {
    Keyboard.dismiss();
    try {
      if (values.type && values.category) {
        await tryCreateNewTransaction({
          amount: Number(values.amount),
          description: values.description,
          date: formatIsoDate(values.date),
          user_id: 1,
          type_id: values.type.id,
          category_id: values.category.id,
        }).unwrap();
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("An error occurred while adding transaction", "Please try again");
    }
  };

  const openSheet = () => {
    if (sheetRef?.current) {
      Keyboard.dismiss();
      sheetRef?.current?.openSheet();
    }
  };

  const formik = useFormik<TransactionFromInputs>({
    initialValues: initialTransactionFormValues,
    validationSchema: transactionValidationSchema,
    validateOnChange: hasSubmittedForm,
    onSubmit: (values) => onTransactionAdd(values),
  });

  const onSelectCategory = (category: Category, type: Transaction) => {
    formik.setFieldValue("category", category);
    formik.setFieldValue("type", type);
  };

  const setCategoryText = () => {
    if (!formik.values.category && !formik.values.type) {
      return "";
    }
    return `${formik.values.category?.label}, ${formik.values.type?.label}`;
  };

  const onSubmit = () => {
    setHasSubmittedForm(true);
    formik.handleSubmit();
  };

  return (
    <View style={styles.container}>
      <DatePickerInput date={date} maximumDate={new Date()} onDateSelect={setDate} />
      <LabelInput
        value={formik.values.amount}
        placeholder='Amount'
        onChangeText={formik.handleChange("amount")}
        keyboardType='decimal-pad'
        style={styles.marginTop}
        icon={<FontAwesome5 name='coins' size={24} color={colors.greenMint} />}
        autoFocus
      />
      <InputErrorLabel text={formik.errors.amount} isVisible={!!formik.errors.amount} />
      <TouchableOpacity onPress={openSheet}>
        <LabelInput
          value={setCategoryText()}
          icon={<MaterialIcons name='category' size={24} color={colors.greenMint} />}
          disabled
          placeholder='Category'
          style={styles.marginTop}
          inputStyle={styles.category}
        />
      </TouchableOpacity>
      <InputErrorLabel
        text={formik.errors.category}
        isVisible={!!formik.errors.category || !!formik.errors.type}
      />
      <TextBox
        placeholder='Transaction comment'
        style={styles.marginTop}
        numberOfLines={6}
        maxLength={300}
        value={formik.values.description}
        onChangeText={formik.handleChange("description")}
      />
      <CustomButton title='Submit' onPress={onSubmit} style={styles.marginTop} />
      <AppActivityIndicator isLoading={isLoading} />
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
    marginTop: 20,
  },
  category: {
    color: colors.black,
  },
});
