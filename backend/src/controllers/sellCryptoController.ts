import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";
// import { InvestedCrypto } from "../entity/InvestedCrypto";
import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";
import Joi from "joi";

const sellCryptoController = async (req: newRequest, res: Response) => {
  const { error } = validateSoldCrypto(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { investedCryptoName, changeInWalletAmt, cryptoBucksToBeAdded } =
    req.body;
  const { id } = req.user;

  const getUser = await AppDataSource.manager.findOne(Client, {
    where: {
      id,
    },
    relations: {
      investments: true,
    },
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });

  const cryptoToSell = getUser.investments.find(
    (crypto) => crypto.investedCryptoName === investedCryptoName
  );

  if (!cryptoToSell)
    return res.status(404).json({
      msg: `You are currently not investing in ${investedCryptoName}`,
    });

  if (cryptoToSell.amtInWallet < changeInWalletAmt)
    return res.status(400).json({ msg: "Not enough funds!" });

  cryptoToSell.amtInWallet = (+cryptoToSell.amtInWallet - +changeInWalletAmt)
    .toFixed(6)
    .toString(); // Subtracting numbers that are string using unary operators

  await AppDataSource.manager.save(cryptoToSell);

  getUser.investments.find(
    (crypto) => crypto.investedCryptoName === investedCryptoName
  ).amtInWallet = cryptoToSell.amtInWallet;

  getUser.cryptoBucks = getUser.cryptoBucks + cryptoBucksToBeAdded;
  await AppDataSource.manager.save(getUser);

  res.status(200).json({
    msg: `Sold successfully`,
    investedCryptos: getUser.investments,
    cryptoBucks: getUser.cryptoBucks,
  });
};

interface ValidInvestedCrypto {
  investedCryptoName: string;
  changeInWalletAmt: string;
  cryptoBucksToBeAdded: number;
}

const validateSoldCrypto = (incomingReq: ValidInvestedCrypto) => {
  const schema = Joi.object({
    investedCryptoName: Joi.string().required(),
    changeInWalletAmt: Joi.string().required(),
    cryptoBucksToBeAdded: Joi.number().required(),
  });
  return schema.validate(incomingReq, { abortEarly: false });
};

export default sellCryptoController;
