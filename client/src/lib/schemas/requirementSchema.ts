import { z } from "zod";

export const hiringCategoryEnum = z.enum(["Planner", "Performer", "Crew"]);

// We break this down so we can validate per-step if needed later
export const requirementFormSchema = z.object({
  eventName: z.string().min(3, { message: "Event name must be at least 3 characters" }),
  eventType: z.string().min(1, { message: "Please select an event type" }),
  // RHF usually handles dates as Date objects, backend expects ISO string
  eventDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Event date is required",
  }), 
  location: z.string().min(1, { message: "Location is required" }),
  venue: z.string().optional(),
  hiringCategory: hiringCategoryEnum,
  specificDetails: z.record(z.string(), z.any()).optional(),
});

export type RequirementFormValues = z.infer<typeof requirementFormSchema>;