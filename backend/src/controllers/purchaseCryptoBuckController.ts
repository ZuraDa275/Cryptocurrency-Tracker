import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";
import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";

const calculateOrderAmount = (cryptoBucksAmt: string): number => {
  if (cryptoBucksAmt === "500") return 500;
  else if (cryptoBucksAmt === "2,500") return 2500;
  else if (cryptoBucksAmt === "5,000") return 5000;
  else return 10000;
};

const purchaseCryptoBuckController = async (req: newRequest, res: Response) => {
  const { cryptoBucksAmt } = req.body;
  const { id } = req.user;

  const getUser = await AppDataSource.manager.findOneBy(Client, {
    id,
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });

  getUser.cryptoBucks =
    getUser.cryptoBucks + calculateOrderAmount(cryptoBucksAmt);

  await AppDataSource.manager.save(getUser);

  res.status(200).json({
    msg: "Payment successful!",
    cryptoBucks: getUser.cryptoBucks,
  });
};

export default purchaseCryptoBuckController;
