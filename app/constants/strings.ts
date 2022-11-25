export const errors = {
  unknown: "Unknown error occurred",
  general: "An error occurred while getting data",
  tryAgain: "Please try again",
};

export const userAuthError = {
  storeData: "Error with storing user data",
  removeData: "Error with removing user data",
  readData: "Error with reading user data",
};

export const alertButton = {
  cancel: "Cancel",
  delete: "Delete",
};

export const dateAndTime = {
  today: "Today",
  yesterday: "Yesterday",
};

export const auth = {
  loginTitle: "Welcome",
  registerTitle: "Create a new account",
  logIn: "Log in",
  signUp: "Sign up",
};

export const transactions = {
  available: "Available:",
  income: "Income:",
  expenses: "Expenses:",
  showMinus: (isIncome: boolean) => (isIncome ? "" : "-"),
  noTransaction: "Transaction does not exist",
  deleteTransaction: "Are you sure you want to delete this transaction?",
  errorAdding: "An error occurred while adding transaction",
  editTransaction: "Edit transaction",
  addTransaction: "Add transaction",
};

export const logoutAlertStrings = {
  title: "Are you sure you want to log out?",
};

export const deleteUserDataStrings = {
  title: "Are you sure you want to delete your data?",
  subtitle: "All user data will permanently be deleted. This action cannot be undone.",
}
