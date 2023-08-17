import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";
import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";

const deleteFollowsController = async (req: newRequest, res: Response) => {
  const { followingUserName } = req.body;
  const { id } = req.user;

  const getUserToBeUnfollowed = await AppDataSource.manager.findOne(Client, {
    where: {
      username: followingUserName,
    },
    relations: {
      followers: true,
    },
  });

  if (!getUserToBeUnfollowed)
    return res
      .status(200)
      .json({ msg: "User you are trying to unfollow doesn't exit!" });

  const getUser = await AppDataSource.manager.findOne(Client, {
    where: {
      id,
    },
    relations: {
      following: true,
      followers: true,
    },
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });

  const userToBeUnfollowed = getUser.following.find(
    (follow) => follow.followingUserName === followingUserName
  );
  if (!userToBeUnfollowed)
    return res.status(404).json({ msg: "The user is already unfollowed!" });

  getUser.following = getUser.following.filter(
    (follow) => follow.followingUserName !== followingUserName
  );

  await AppDataSource.manager.save(getUser);

  getUserToBeUnfollowed.followers = getUserToBeUnfollowed.followers.filter(
    (fwer) => fwer.followersUserName !== getUser.username
  );

  await AppDataSource.manager.save(getUserToBeUnfollowed);

  res.status(200).json({
    msg: `You stopped following ${followingUserName}`,
    following: getUser.following,
    followers: getUser.followers,
  });
};

export default deleteFollowsController;
