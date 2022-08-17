import * as express from 'express';
import { loginUser } from './loginUser';
import { transactionRoute } from './transaction';

const router = express()

router.use(loginUser);
router.use(transactionRoute);

export default router;