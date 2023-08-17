import { Router } from "express";
import getAccessTokenOnExpirationController from "../controllers/getAccessTokenOnExpirationController";

const router = Router();

router.get("/", getAccessTokenOnExpirationController);

export default router;
