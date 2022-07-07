import { sign } from "jsonwebtoken";
import { configDB } from "../config";

type QueryResultType = {
  id: number;
  username: string;
  email: string;
};

export const createAccessToken = (queryResult: QueryResultType) => {
  return sign(
    {
      userData: queryResult,
    },
    configDB.jwt_token,
    {
      expiresIn: "4h",
    }
  );
};

export const createRefreshToken = (queryResult: QueryResultType) => {
  return sign(
    {
      userData: queryResult,
    },
    configDB.jwt_refresh,
    {
      expiresIn: "30d",
    }
  );
};

