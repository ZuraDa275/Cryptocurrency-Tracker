import { Request, Response } from "express";
import { Client } from "../entity/User";
import Joi from "joi";
import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";

const loginController = async (req: Request, res: Response) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { email, password } = req.body;
  const hasUserAlreadyRegistered = await AppDataSource.manager.findOne(Client, {
    where: {
      email,
    },
    relations: {
      trackedCryptos: true,
      followers: true,
      following: true,
      profile: true,
      investments: true,
    },
  });

  if (!hasUserAlreadyRegistered) {
    return res.status(404).json({ msg: "INVALID EMAIL OR PASSWORD!" });
  }

  const passwordCheck = await bcrypt.compare(
    password,
    hasUserAlreadyRegistered.password
  );

  if (!passwordCheck) {
    return res.status(404).json({ msg: "INVALID EMAIL OR PASSWORD!" });
  }

  const refreshToken = hasUserAlreadyRegistered.getRefreshToken();
  const accessToken = hasUserAlreadyRegistered.getAccessToken();
  res
    .cookie("x-refresh-token", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // sameSite: "none",
      // secure: true,
    })
    .header("x-token", accessToken)
    .status(200)
    .json({
      msg: "User logged in successfully!",
      userInfo: hasUserAlreadyRegistered,
    });
};

interface ValidLogin {
  email: string;
  password: string;
}

const validateLogin = (incomingLoginReq: ValidLogin) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(incomingLoginReq, { abortEarly: false });
};
export default loginController;
