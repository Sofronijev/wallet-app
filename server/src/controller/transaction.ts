import { Request, Response } from "express";
import {
  createTransaction,
  getMonthlyTransactionData,
  getMonthlyTransactionsSums,
} from "../logic/helperFunctions/transactions";
import { getTransactionsRequest, TransactionType } from "../logic/types/transactions";

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const savedTransaction = await createTransaction(req.body as TransactionType);
    return res.status(200).send({ id: savedTransaction.id });
  } catch (error) {
    return res.status(500).send({ message: "Error adding transaction" });
  }
};

export const getMonthlyTransactionsForUser = async (req: Request, res: Response) => {
  const { user_id, start, count, date } = req.body as getTransactionsRequest;
  try {
    const transactionSums = await getMonthlyTransactionsSums(user_id, date);
    const transactions = await getMonthlyTransactionData(user_id, date, count, start);
    return res
      .status(200)
      .send({ transactions: transactions[0], count: transactions[1], ...transactionSums });
  } catch (error) {
    return res.status(500).send({ message: "Error getting transactions", error });
  }
};
