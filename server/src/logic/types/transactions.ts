export type TransactionType = {
  amount: number;
  description: string;
  date: string;
  user_id: number;
  category_id: number;
  type_id: number;
};

export type EditTransactionType =  Omit<TransactionType, 'user_id'> & {id: number};

export type TransactionSumType = {
  income: number;
  expense: number;
};

export type getTransactionsRequest = {
    user_id: number;
    start: number;
    count: number;
    date: string;
}
