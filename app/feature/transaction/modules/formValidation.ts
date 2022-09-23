import * as Yup from "yup";
import { formatIsoDate } from "modules/timeAndDate";
import { Category, Transaction } from "modules/transactionCategories";

export const initialTransactionFormValues = {
  date: formatIsoDate(new Date()),
  amount: "",
  description: "",
  category: null,
  type: null,
};

export type TransactionFromInputs = {
  date: string;
  amount: string;
  description: string;
  category: Category | null;
  type: Transaction | null;
};

export const transactionValidationSchema = Yup.object({
  date: Yup.string().required().label("Date"),
  amount: Yup.number().required().label("Amount"),
  category: Yup.object().required().nullable().label("Category"),
  type: Yup.object().required().nullable().label("Type"),
});
