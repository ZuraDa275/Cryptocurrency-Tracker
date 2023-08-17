import { Router } from "express";
import addCryptoController from "../controllers/addCryptoController";
import deleteCryptoController from "../controllers/deleteCryptoController";
import purchaseCryptoBuckController from "../controllers/purchaseCryptoBuckController";
import authMiddleware from "../middleware/authMiddleware";
import { asyncErrorMiddleware } from "../middleware/asyncErrorMiddleware";
import createPaymentIntentController from "../controllers/createPaymentIntentController";
import sendCryptoBucksController from "../controllers/sendCryptoBucksController";
import addInvestedCryptoController from "../controllers/addInvestedCryptoController";
import sellCryptoController from "../controllers/sellCryptoController";

const router = Router();

router.put(
  "/add-to-track",
  authMiddleware,
  asyncErrorMiddleware(addCryptoController)
);
router.put(
  "/delete-tracked-crypto",
  authMiddleware,
  asyncErrorMiddleware(deleteCryptoController)
);

router.post(
  "/purchase-crypto-bucks",
  authMiddleware,
  asyncErrorMiddleware(purchaseCryptoBuckController)
);

router.post(
  "/send-crypto-bucks",
  authMiddleware,
  asyncErrorMiddleware(sendCryptoBucksController)
);

router.post(
  "/add-invested-cryptos",
  authMiddleware,
  asyncErrorMiddleware(addInvestedCryptoController)
);
router.post(
  "/sell-invested-cryptos",
  authMiddleware,
  asyncErrorMiddleware(sellCryptoController)
);

router.post(
  "/create-payment-intent",
  asyncErrorMiddleware(createPaymentIntentController)
);

export default router;
