import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";
import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";

const deleteCryptoController = async (req: newRequest, res: Response) => {
  const { cryptoName } = req.body;
  const { id } = req.user;

  const getUser = await AppDataSource.manager.findOne(Client, {
    where: {
      id,
    },
    relations: {
      trackedCryptos: true,
    },
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });

  const cryptoToDeleteFromBeingTracked = getUser.trackedCryptos.find(
    (crypto) => crypto.cryptoName === cryptoName
  );
  if (!cryptoToDeleteFromBeingTracked)
    return res
      .status(404)
      .json({ msg: "The cryptocurrency is not being tracked currently!" });

  getUser.trackedCryptos = getUser.trackedCryptos.filter(
    (crypto) => crypto.cryptoName !== cryptoName
  );

  await AppDataSource.manager.save(getUser);

  res.status(200).json({
    msg: `${cryptoName} deleted successfully from being tracked!`,
    trackedCryptos: getUser.trackedCryptos,
  });
};

export default deleteCryptoController;
