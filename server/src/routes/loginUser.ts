import * as express from "express";
import { getUserData } from "../controller/user";

const router = express.Router();

router.post("/users/login", getUserData);

export { router as loginUser };
