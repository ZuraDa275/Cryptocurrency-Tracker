import { Request, Response } from "express";
import { Client } from "../entity/User";
import { AppDataSource } from "../data-source";
import { ILike } from "typeorm";

const getUserListController = async (req: Request, res: Response) => {
  const { search } = req.body;

  const loadedUsers = await AppDataSource.manager.find(Client, {
    where: {
      username: ILike(`${search}%`),
    },
    relations: {
      profile: true,
    },
  });

  res.status(200).json({ userList: loadedUsers });
};

export default getUserListController;
