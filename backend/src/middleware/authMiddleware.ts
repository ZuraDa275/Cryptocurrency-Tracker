import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import "dotenv/config";

interface IdIncludedPayload extends JwtPayload {
  id?: number;
}
export interface newRequest extends Request {
  user: IdIncludedPayload;
}

const authMiddleware = async (
  req: newRequest,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies["x-refresh-token"];
  const accessToken = req.header("x-token");

  if (refreshToken) {
    try {
      const decoded = verify(
        accessToken,
        process.env.ACCESS_SECRET_KEY
      ) as IdIncludedPayload;
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ msg: "Access denied to the requested resource!" });
      console.log(error);
    }
  } else {
    res
      .status(401)
      .json({ msg: "Session timed out. Log in for authentication!" });
  }
};
export default authMiddleware;
