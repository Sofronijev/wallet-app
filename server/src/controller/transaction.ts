import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entities/Transaction";

const transactionRepository = AppDataSource.getRepository(Transaction);

export const addTransaction = async (req: Request, res: Response) => {
  const { amount, description, date, user_id, category_id, type_id } = req.body;

  const transaction = new Transaction();
  transaction.amount = amount;
  transaction.description = description;
  transaction.date = date;
  transaction.userId = user_id;
  transaction.categoryId = category_id;
  transaction.typeId = type_id;

  try {
    const savedTransaction = await transactionRepository.save(transaction);
    return res.status(200).send({ id: savedTransaction.id });
  } catch (error) {
    return res.status(500).send({ message: "Error adding transaction" });
  }
};

export const getAllTransactionsForUser = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    const allTransactions = await transactionRepository.findOne({
      select: {
        id: true,
        date: true,
        amount: true,
        categoryId: true,
        typeId: true,
        description: true,
      },
      where: { id: user_id },
    });
    return res.status(200).send({ transactions: allTransactions });
  } catch (error) {
    return res.status(500).send({ message: "Error getting transactions" });
  }
};
