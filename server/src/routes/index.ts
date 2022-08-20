import * as express from 'express';
import { tokenAuthorization } from '../auth/tokenAuth';
import { loginUser } from './loginUser';
import { transactionRoute } from './transaction';

const router = express()

router.use(loginUser);
router.use(tokenAuthorization, transactionRoute);

export default router;