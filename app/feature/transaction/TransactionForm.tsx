import { Alert, Keyboard, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import {
  useCreateNewTransactionMutation,
  useDeleteTransactionMutation,
  useEditTransactionMutation,
} from "app/middleware/transactions";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";
import {
  initialTransactionFormValues,
  TransactionFromInputs,
  transactionValidationSchema,
} from "./modules/formValidation";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HeaderIcon from "components/HeaderIcon";
import { deleteTransactionAlert, handleTransactionError } from "./modules";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";

type Props = {
  navigation: StackNavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "Transaction">;
};

const TransactionForm: React.FC<Props> = ({ navigation, route }) => {
  const editData = route.params?.editData;
  const sheetRef = useRef<TransactionBottomSheetType>(null);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [tryCreateNewTransaction, { isLoading }] = useCreateNewTransactionMutation();
  const [tryEditNewTransaction, { isLoading: editLoading }] = useEditTransactionMutation();
  const [tryDeleteNewTransaction, { isLoading: deleteLoading }] = useDeleteTransactionMutation();
  const userId = useAppSelector(getUserId);

  const onTransactionSubmit = async (values: TransactionFromInputs) => {
    Keyboard.dismiss();
    try {
      if (values.type && values.category) {
        if (editData) {
          await tryEditNewTransaction({
            id: editData.id,
            amount: Number(values.amount),
            description: values.description,
            date: formatIsoDate(values.date),
            typeId: values.type.id,
            categoryId: values.category.id,
          }).unwrap();
        } else {
          await tryCreateNewTransaction({
            amount: Number(values.amount),
            description: values.description,
            date: formatIsoDate(values.date),
            userId,
            typeId: values.type.id,
            categoryId: values.category.id,
          }).unwrap();
        }
        navigation.goBack();
      }
    } catch (error) {
      handleTransactionError(error);
    }
  };

  const onDeleteTransaction = async () => {
    try {
      if (editData) await tryDeleteNewTransaction({ id: editData.id }).unwrap();
      navigation.goBack();
    } catch (error) {
      handleTransactionError(error);
    }
  };

  const onDelete = () => {
    Keyboard.dismiss();
    deleteTransactionAlert(onDeleteTransaction);
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
    onSubmit: (values) => onTransactionSubmit(values),
  });

  useEffect(() => {
    if (editData) {
      const { id, ...data } = editData;
      formik.setValues(data);
      navigation.setOptions({
        title: "Edit transaction",
        headerRight: () => (
          <HeaderIcon onPress={onDelete}>
            <Ionicons name='trash-sharp' size={24} color={colors.white} />
          </HeaderIcon>
        ),
      });
    }
  }, [editData]);

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

  const onDateChange = (date: string) => {
    formik.setFieldValue("date", date);
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
      <LabelInput
        value={formik.values.amount}
        placeholder='Amount'
        onChangeText={formik.handleChange("amount")}
        keyboardType='decimal-pad'
        style={styles.marginTop}
        icon={<FontAwesome5 name='coins' size={24} color={colors.greenMint} />}
        autoFocus={!editData}
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
      <AppActivityIndicator isLoading={isLoading || editLoading || deleteLoading} />
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
