import { TransactionFromInputs } from "feature/transaction/modules/formValidation";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  Balance: undefined;
  Analytics: undefined;
  Settings: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Transaction: { editData: TransactionFromInputs & { id: number } } | undefined;
  TransactionSearch: undefined;
};
