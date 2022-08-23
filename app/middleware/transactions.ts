export type MonthlyTransactionsReq = {
  user_id: number;
  start: number;
  count: number;
  date: string;
};

export type CreateTransactionReq = {
  amount: number;
  description: string;
  date: string;
  user_id: number;
  type_id: number;
  category_id: number;
};

export const getMonthlyTransactionsQuery = (data: MonthlyTransactionsReq) => ({
  url: "/transaction/getMonthlyUserTransactions",
  method: "POST",
  body: data,
});

export const createNewTransactionQuery = (transactionData: CreateTransactionReq) => ({
  url: "/transaction/addTransaction",
  method: "POST",
  body: transactionData,
});
