import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";
import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";
import Joi from "joi";

const sendCryptoBucksController = async (req: newRequest, res: Response) => {
  const { error } = validateSender(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { id } = req.user;
  const { mutualToSendCrypto, amtToSend } = req.body;

  const getUser = await AppDataSource.manager.findOneBy(Client, {
    id,
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });

  if (getUser.cryptoBucks < amtToSend)
    return res.status(400).json({ msg: "Not enough cryptoBucks!" });

  const doesMutualExist = await AppDataSource.manager.findOneBy(Client, {
    username: mutualToSendCrypto,
  });
  if (!doesMutualExist)
    return res.status(404).json({ msg: "Mutual doesn't exist!" });

  getUser.cryptoBucks = getUser.cryptoBucks - amtToSend;
  await AppDataSource.manager.save(getUser);

  doesMutualExist.cryptoBucks = doesMutualExist.cryptoBucks + amtToSend;
  await AppDataSource.manager.save(doesMutualExist);

  res.status(200).json({
    cryptoBucks: getUser.cryptoBucks,
    msg: `${amtToSend} cryptoBucks transferred to ${mutualToSendCrypto} successfully!`,
  });
};

interface ValidUser {
  mutualToSendCrypto: string;
  amtToSend: number;
}

const validateSender = (incomingReq: ValidUser) => {
  const schema = Joi.object({
    mutualToSendCrypto: Joi.string().required(),
    amtToSend: Joi.number().required(),
  });
  return schema.validate(incomingReq, { abortEarly: false });
};
export default sendCryptoBucksController;
