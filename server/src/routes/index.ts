import * as express from 'express';
import { loginUser } from './loginUser';

const router = express()

router.use(loginUser);

export default router;