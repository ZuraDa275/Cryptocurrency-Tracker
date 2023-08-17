import { Request, Response } from "express";

const logoutController = (req: Request, res: Response) => {
  res
    .clearCookie("x-refresh-token")
    .status(200)
    .json({ msg: "User logged out successfully!" });
};

export default logoutController;
