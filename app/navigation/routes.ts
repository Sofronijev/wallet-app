import { TransactionFromInputs } from "feature/transaction/modules/formValidation";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  Main: undefined;
  Details: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Transaction: { editData: TransactionFromInputs & { id: number } } | undefined;
};
