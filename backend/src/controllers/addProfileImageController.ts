import { AppDataSource } from "../data-source";
import { Client } from "../entity/User";
import { ProfileImage } from "../entity/ProfileImage";
import { Response } from "express";
import { newRequest } from "../middleware/authMiddleware";

const addProfileImageController = async (req: newRequest, res: Response) => {
  const { profileImage } = req.body;
  const { id } = req.user;
  const newProfile = new ProfileImage();

  newProfile.profileImage = profileImage;
  await AppDataSource.manager.save(newProfile);

  const getUser = await AppDataSource.manager.findOne(Client, {
    where: {
      id,
    },
    relations: {
      profile: true,
    },
  });

  if (!getUser) return res.status(404).json({ msg: "User doesn't exist!" });

  getUser.profile = newProfile;
  await AppDataSource.manager.save(getUser);

  res.status(200).json({
    msg: "Profile Image updated successfully!",
    profileImage: getUser.profile.profileImage,
  });
};

export default addProfileImageController;
