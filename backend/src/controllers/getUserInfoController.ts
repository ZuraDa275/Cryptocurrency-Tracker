import { Request, Response } from "express";
import { Client } from "../entity/User";
import { AppDataSource } from "../data-source";

const getUserInfoController = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) {
    return res.status(404).json({ msg: "PAGE NOT FOUND!" });
  }
  const userInfo = await AppDataSource.manager.findOne(Client, {
    where: {
      username,
    },
    relations: {
      trackedCryptos: true,
      followers: true,
      following: true,
      profile: true,
      investments: true,
    },
  });
  if (!userInfo) {
    return res.status(404).json({ msg: "PAGE NOT FOUND!" });
  }

  res.status(200).json({
    username: userInfo.username,
    trackedCryptos: userInfo.trackedCryptos,
    followers: userInfo.followers,
    following: userInfo.following,
    profile: userInfo.profile.profileImage,
    investments: userInfo.investments,
  });
};

export default getUserInfoController;
