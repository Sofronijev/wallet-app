import * as express from "express";
import { tokenAuthorization } from "../auth/tokenAuth";
import { addTransaction, getAllTransactionsForUser } from "../controller/transaction";

const router = express.Router();

router.post("/transaction/addTransaction", tokenAuthorization, addTransaction);
router.post("/transaction/getAllUserTransactions", getAllTransactionsForUser);

export { router as transactionRoute };