import { Client } from "../entity/User";
import { AppDataSource } from "../data-source";
import { verify, JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { Request, Response } from "express";

interface IdIncludedPayload extends JwtPayload {
  id?: number;
}

const getAccessTokenOnExpiration = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["x-refresh-token"];

  if (!refreshToken)
    return res
      .status(401)
      .json({ msg: "Session timed out. Log in for authentication!" });

  try {
    const payload = verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    ) as IdIncludedPayload;

    const getCurrentUser = await AppDataSource.manager.findOneBy(Client, {
      id: payload.id,
    });
    const newAccessToken = getCurrentUser.getAccessToken();
    res.status(200).json({ newAccessToken });
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Session timed out. Log in for authentication!" });
    console.error(error);
  }
};
export default getAccessTokenOnExpiration;
