import { Router } from "express";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import getUserInfoController from "../controllers/getUserInfoController";
import logoutController from "../controllers/logoutController";
import { asyncErrorMiddleware } from "../middleware/asyncErrorMiddleware";
import getUserListController from "../controllers/getUserList";
import addProfileImageController from "../controllers/addProfileImageController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/register", asyncErrorMiddleware(registerController));
router.post("/login", asyncErrorMiddleware(loginController));
router.get("/logout", logoutController);
router.post(
  "/user-list",
  authMiddleware,
  asyncErrorMiddleware(getUserListController)
);
router.post(
  "/add-profile-image",
  authMiddleware,
  asyncErrorMiddleware(addProfileImageController)
);
router.get("/:username", asyncErrorMiddleware(getUserInfoController));

export default router;
