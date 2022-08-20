import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/Transaction";
import { TransactionSumType, TransactionType } from "../types/transactions";

const INCOME_CATEGORY = 1;

const transactionRepository = AppDataSource.getRepository(Transaction);

export const getTransactionsSums = async (user_id: number): Promise<TransactionSumType> =>
  await transactionRepository
    .createQueryBuilder("transaction")
    .select("SUM(amount)", "expense")
    .addSelect((subQuery) => {
      return subQuery
        .select("SUM(amount)", "income")
        .from(Transaction, "t")
        .where("t.category_id = :income_category", { income_category: INCOME_CATEGORY })
        .andWhere("t.user_id = :user_id", { user_id });
    }, "income")
    .where("transaction.user_id = :user_id", { user_id })
    .andWhere("transaction.category_id <> :income_category", { income_category: INCOME_CATEGORY })
    .getRawOne();

export const getAllTransactionData = async (user_id: number, skip = 0, take: number) =>
  await transactionRepository.findAndCount({
    select: {
      id: true,
      date: true,
      amount: true,
      categoryId: true,
      typeId: true,
      description: true,
    },
    where: { userId: user_id },
    skip,
    take,
  });

export const createTransaction = async (data: TransactionType) => {
  const transaction = new Transaction();
  transaction.amount = data.amount;
  transaction.description = data.description;
  transaction.date = data.date;
  transaction.userId = data.user_id;
  transaction.categoryId = data.category_id;
  transaction.typeId = data.type_id;

  return await transactionRepository.save(transaction);
};
