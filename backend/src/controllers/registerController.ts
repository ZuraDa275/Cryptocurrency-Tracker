import { Request, Response } from "express";
import { Client } from "../entity/User";
import Joi from "joi";
import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";

const registerController = async (req: Request, res: Response) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { username, email, password } = req.body;

  const alreadyRegisteredUsername = await AppDataSource.manager.findOneBy(
    Client,
    {
      username,
    }
  );
  if (alreadyRegisteredUsername) {
    return res
      .status(422)
      .json({ msg: "User for the provided username already exists" });
  }
  const alreadyRegisteredEmail = await AppDataSource.manager.findOneBy(Client, {
    email,
  });
  if (alreadyRegisteredEmail) {
    return res
      .status(422)
      .json({ msg: "User for the provided email already exists" });
  }

  const newUser = new Client();
  newUser.username = username;
  newUser.email = email;
  newUser.cryptoBucks = 100;

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await AppDataSource.manager.save(newUser);

  const userInfo = await AppDataSource.manager.findOne(Client, {
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
  const refreshToken = newUser.getRefreshToken();
  const accessToken = newUser.getAccessToken();
  res
    .cookie("x-refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // sameSite: "none",
      // secure: true,
    })
    .header("x-token", accessToken)
    .status(200)
    .json({ msg: "User registered successfully", userInfo });
};

interface ValidRegister {
  username: string;
  email: string;
  password: string;
}

const validateRegister = (incomingRegisterReq: ValidRegister) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(incomingRegisterReq, { abortEarly: false });
};

export default registerController;
