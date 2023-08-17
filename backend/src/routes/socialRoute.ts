import { Router } from "express";
import { asyncErrorMiddleware } from "../middleware/asyncErrorMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import addFollowsController from "../controllers/addFollowsController";
import deleteFollowsController from "../controllers/deleteFollowsController";

const router = Router();

router.post(
  "/add-follow",
  authMiddleware,
  asyncErrorMiddleware(addFollowsController)
);
router.post(
  "/delete-follow",
  authMiddleware,
  asyncErrorMiddleware(deleteFollowsController)
);

export default router;
