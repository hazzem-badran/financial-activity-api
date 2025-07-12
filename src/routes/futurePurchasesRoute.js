import express from "express";
import {
  createFuturePurchase,
  deleteFuturePurchase,
  getFuterePurchasesByUserId,
} from "../controllers/futurePurchasesControllers.js";

const router = express.Router();

router.get("/:userId", getFuterePurchasesByUserId);
router.post("/", createFuturePurchase);
router.delete("/:id", deleteFuturePurchase);

export default router;
