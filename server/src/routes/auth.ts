import * as express from "express";
import { getUserData, refreshAccessToken } from "../controller/auth";

const router = express.Router();

router.post("/users/login", getUserData);
router.post("/refreshToken", refreshAccessToken);

export { router as authRoute };
