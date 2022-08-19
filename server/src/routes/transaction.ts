import * as express from "express";
import { addTransaction, getAllTransactionsForUser } from "../controller/transaction";

const router = express.Router();

router.post("/transaction/addTransaction", addTransaction);
router.post("/transaction/getAllUserTransactions", getAllTransactionsForUser);

export { router as transactionRoute };