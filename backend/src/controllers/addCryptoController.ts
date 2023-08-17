import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";
import { CryptoBeingTracked } from "../entity/CryptoBeingTracked";
import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";
import Joi from "joi";

const addCryptoController = async (req: newRequest, res: Response) => {
  const { error } = validateCrypto(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { cryptoName, cryptoImage, cryptoID } = req.body;
  const { id } = req.user;
  const newCrypto = new CryptoBeingTracked();

  newCrypto.cryptoName = cryptoName;
  newCrypto.cryptoImage = cryptoImage;
  newCrypto.cryptoID = cryptoID;
  await AppDataSource.manager.save(newCrypto);

  const getUser = await AppDataSource.manager.findOne(Client, {
    where: {
      id,
    },
    relations: {
      trackedCryptos: true,
    },
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });
  if (getUser.trackedCryptos.find((crypto) => crypto.cryptoName === cryptoName))
    return res
      .status(422)
      .json({ msg: "The cryptocurrency is already being tracked!" });

  getUser.trackedCryptos.push(newCrypto);
  await AppDataSource.manager.save(getUser);

  res.status(200).json({
    msg: `${cryptoName} added to the tracking list successfully!`,
    trackedCryptos: getUser.trackedCryptos,
  });
};
interface ValidCrypto {
  cryptoName: string;
  cryptoImage: string;
  cryptoID: string;
}

const validateCrypto = (incomingReq: ValidCrypto) => {
  const schema = Joi.object({
    cryptoName: Joi.string().required(),
    cryptoImage: Joi.string().required(),
    cryptoID: Joi.string().required(),
  });
  return schema.validate(incomingReq, { abortEarly: false });
};
export default addCryptoController;
