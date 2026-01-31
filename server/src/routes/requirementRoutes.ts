import express from "express";
import { createRequirement } from "../controllers/requirementController.js";

const router = express.Router();

// POST /api/requirements
router.post("/", createRequirement);

export default router;