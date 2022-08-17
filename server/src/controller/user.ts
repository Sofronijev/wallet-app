import { Request, Response } from "express";
import { compare } from "bcrypt";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { createAccessToken, createRefreshToken } from "../auth/signToken";

const userRepository = AppDataSource.getRepository(User);

export const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).send({ message: "Wrong email or password" });
    }

    const passwordMatched = await compare(req.body.password, user.password);

    if (passwordMatched) {
      const { password, ...restData } = user;
      const refreshToken = createRefreshToken(restData);
      const accessToken = createAccessToken(restData);

      return res.status(200).send({ data: restData, token: { refreshToken, accessToken } });
    }
    return res.status(401).send({ message: "Wrong email or password" });
  } catch (error) {
    return res.status(500).send({ message: "Error getting user data" });
  }
};
