import * as express from "express";
import { getUserData, refreshAccessToken, registerUser } from "../controller/auth";

const router = express.Router();

router.post("/users/login", getUserData);
router.post("/users/register", registerUser);
router.post("/refreshToken", refreshAccessToken);

export { router as authRoute };
