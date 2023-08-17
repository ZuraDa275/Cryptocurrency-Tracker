import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";
import { Following } from "../entity/Following";
import { Followers } from "../entity/Followers";
import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";

const addFollowsController = async (req: newRequest, res: Response) => {
  const { followingUserName, profileImage } = req.body;
  const { id } = req.user;
  const newFollowing = new Following();
  const newFollower = new Followers();

  const getUserThatIsGoingToBeFollowed = await AppDataSource.manager.findOne(
    Client,
    {
      where: {
        username: followingUserName,
      },
      relations: {
        followers: true,
      },
    }
  );

  if (!getUserThatIsGoingToBeFollowed)
    return res
      .status(404)
      .json({ msg: "User you are trying to follow doesn't exist!" });

  const followingAlreadyExists = await AppDataSource.manager.findOneBy(
    Following,
    {
      followingUserName,
    }
  );

  if (!followingAlreadyExists) {
    newFollowing.followingUserName = followingUserName;
    newFollowing.followingUserProfile = profileImage;
    await AppDataSource.manager.save(newFollowing);
  }

  const getUser = await AppDataSource.manager.findOne(Client, {
    where: {
      id,
    },
    relations: {
      following: true,
      followers: true,
      profile: true,
    },
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });
  if (
    getUser.following.find(
      (follow) => follow.followingUserName === followingUserName
    )
  )
    return res
      .status(422)
      .json({ msg: "The user is alreading being followed!" });

  getUser.following.push(
    followingAlreadyExists ? followingAlreadyExists : newFollowing
  );
  await AppDataSource.manager.save(getUser);

  const followerAlreadyExists = await AppDataSource.manager.findOneBy(
    Followers,
    {
      followersUserName: getUser.username,
    }
  );

  if (!followerAlreadyExists) {
    newFollower.followersUserName = getUser.username;
    newFollower.followerUserProfile = getUser.profile.profileImage;
    await AppDataSource.manager.save(newFollower);
  }

  getUserThatIsGoingToBeFollowed.followers.push(
    followerAlreadyExists ? followerAlreadyExists : newFollower
  );

  await AppDataSource.manager.save(getUserThatIsGoingToBeFollowed);

  res.status(200).json({
    msg: `You started following ${followingUserName}`,
    following: getUser.following,
    followers: getUser.followers,
  });
};

export default addFollowsController;
