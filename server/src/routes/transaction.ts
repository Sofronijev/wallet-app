import * as express from "express";
import { tokenAuthorization } from "../auth/tokenAuth";
import { addTransaction, getMonthlyTransactionsForUser } from "../controller/transaction";

const router = express.Router();

router.post("/transaction/addTransaction", tokenAuthorization, addTransaction);
router.post("/transaction/getMonthlyUserTransactions", getMonthlyTransactionsForUser);

export { router as transactionRoute };