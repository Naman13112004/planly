import type { Request, Response } from "express";
import Requirement from "../models/requirement.js";
import { requirementSchema } from "../validators/requirementValidator.js";

export const createRequirement = async (req: Request, res: Response) => {
  try {
    // 1. Validate data using Zod
    const validatedData = requirementSchema.parse(req.body);

    // 2. Create database entry
    const newRequirement = new Requirement(validatedData);
    
    // 3. Save to MongoDB
    const savedRequirement = await newRequirement.save();

    res.status(201).json({
      success: true,
      message: "Requirement created successfully",
      data: savedRequirement,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
       res.status(400).json({ success: false, errors: error.errors });
       return; // explicit return for TS
    }
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};