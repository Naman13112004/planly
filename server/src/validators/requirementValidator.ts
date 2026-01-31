import { z } from "zod";

// Define the enum for hiring categories
export const HiringCategoryEnum = z.enum(["Planner", "Performer", "Crew"]);

// Main Schema
export const requirementSchema = z.object({
  eventName: z.string().min(3, "Event name must be at least 3 characters"),
  eventType: z.string().min(1, "Event type is required"), // e.g., Wedding, Corporate
  eventDate: z.string().datetime(), // ISO Date string
  location: z.string().min(1, "Location is required"),
  venue: z.string().optional(), // Optional
  hiringCategory: HiringCategoryEnum,
  
  // This object allows flexibility based on the category chosen
  specificDetails: z.record(z.string(), z.any()).optional(), 
});

// Infer TypeScript type from the schema
export type CreateRequirementInput = z.infer<typeof requirementSchema>;