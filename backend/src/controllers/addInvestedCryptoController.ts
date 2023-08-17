import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";
import { InvestedCrypto } from "../entity/InvestedCrypto";
import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";
import Joi from "joi";

const addInvestedCryptoController = async (req: newRequest, res: Response) => {
  const { error } = validateInvestedCrypto(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const {
    investedCryptoName,
    amtInWallet,
    investedCryptoImage,
    changeInCryptoBucks,
    investedCryptoSymbol,
    investedCryptoID,
  } = req.body;
  const { id } = req.user;
  const newInvestedCrypto = new InvestedCrypto();

  const getUser = await AppDataSource.manager.findOne(Client, {
    where: {
      id,
    },
    relations: {
      investments: true,
    },
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });

  if (getUser.cryptoBucks < changeInCryptoBucks)
    return res.status(400).json({ msg: "Not enough cryptoBucks!" });

  const cryptoAlreadyInvested = getUser.investments.find(
    (crypto) => crypto.investedCryptoName === investedCryptoName
  );

  if (cryptoAlreadyInvested) {
    cryptoAlreadyInvested.amtInWallet = (
      +cryptoAlreadyInvested.amtInWallet + +amtInWallet
    )
      .toFixed(6)
      .toString(); // Adding numbers that are string using unary operators
    await AppDataSource.manager.save(cryptoAlreadyInvested);
    getUser.investments.find(
      (crypto) => crypto.investedCryptoName === investedCryptoName
    ).amtInWallet = cryptoAlreadyInvested.amtInWallet;
    getUser.cryptoBucks = getUser.cryptoBucks - changeInCryptoBucks;
    await AppDataSource.manager.save(getUser);
  } else {
    newInvestedCrypto.investedCryptoName = investedCryptoName;
    newInvestedCrypto.amtInWallet = amtInWallet;
    newInvestedCrypto.investedCryptoImage = investedCryptoImage;
    newInvestedCrypto.investedCryptoSymbol = investedCryptoSymbol;
    newInvestedCrypto.investedCryptoID = investedCryptoID;
    await AppDataSource.manager.save(newInvestedCrypto);
    getUser.investments.push(newInvestedCrypto);
    getUser.cryptoBucks = getUser.cryptoBucks - changeInCryptoBucks;
    await AppDataSource.manager.save(getUser);
  }

  res.status(200).json({
    msg: `Invested in ${investedCryptoName} successfully`,
    investedCryptos: getUser.investments,
    cryptoBucks: getUser.cryptoBucks,
  });
};

interface ValidInvestedCrypto {
  investedCryptoName: string;
  amtInWallet: string;
  investedCryptoImage: string;
  changeInCryptoBucks: number;
  investedCryptoSymbol: string;
  investedCryptoID: string;
}

const validateInvestedCrypto = (incomingReq: ValidInvestedCrypto) => {
  const schema = Joi.object({
    investedCryptoName: Joi.string().required(),
    amtInWallet: Joi.string().required(),
    investedCryptoImage: Joi.string().required(),
    changeInCryptoBucks: Joi.number().required(),
    investedCryptoSymbol: Joi.string().required(),
    investedCryptoID: Joi.string().required(),
  });
  return schema.validate(incomingReq, { abortEarly: false });
};

export default addInvestedCryptoController;
