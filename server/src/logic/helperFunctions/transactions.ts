import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/Transaction";
import { EditTransactionType, TransactionSumType, TransactionType } from "../types/transactions";

const INCOME_CATEGORY = 1;

const transactionRepository = AppDataSource.getRepository(Transaction);

export const getMonthlyTransactionsSums = async (
  user_id: number,
  date: string
): Promise<TransactionSumType> =>
  await transactionRepository
    .createQueryBuilder("transaction")
    .select("SUM(amount)", "expense")
    .addSelect((subQuery) => {
      return subQuery
        .select("SUM(amount)", "income")
        .from(Transaction, "t")
        .where("t.user_id = :user_id", { user_id })
        .andWhere("t.category_id = :income_category", { income_category: INCOME_CATEGORY })
        .andWhere("YEAR(t.date) = YEAR(:date)", { date })
        .andWhere("MONTH(t.date) = MONTH(:date)", { date });
    }, "income")
    .where("transaction.user_id = :user_id", { user_id })
    .andWhere("transaction.category_id <> :income_category", { income_category: INCOME_CATEGORY })
    .andWhere("YEAR(transaction.date) = YEAR(:date)", { date })
    .andWhere("MONTH(transaction.date) = MONTH(:date)", { date })
    .getRawOne();

export const getMonthlyTransactionData = async (
  user_id: number,
  date: string,
  take: number,
  skip = 0
) =>
  await transactionRepository
    .createQueryBuilder("transaction")
    .where("user_id = :user_id", { user_id })
    .andWhere("YEAR(transaction.date) = YEAR(:date)", { date })
    .andWhere("MONTH(transaction.date) = MONTH(:date)", { date })
    .skip(skip)
    .take(take)
    .orderBy("date", "DESC")
    .addOrderBy("id", "DESC")
    .getManyAndCount();

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

export const setTransaction = async (data: EditTransactionType) => await transactionRepository
  .createQueryBuilder()
  .update(Transaction)
  .set(data)
  .where("id = :id", { id: data.id })
  .execute();

export const deleteTransaction = async (id: number) => await transactionRepository
  .createQueryBuilder()
  .delete()
  .from(Transaction)
  .where("id = :id", { id })
  .execute();
