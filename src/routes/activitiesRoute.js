import express from "express";
import {
  getSummaryByUserId,
  getActivitiesByUserId,
  createActivity,
  deleteActivity,
} from "../controllers/activitiesControllers.js";

const router = express.Router();

router.get("/summary/:userId", getSummaryByUserId);
router.get("/:userId", getActivitiesByUserId);
router.post("/", createActivity);
router.delete("/:id", deleteActivity);

export default router;
