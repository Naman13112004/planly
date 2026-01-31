import mongoose, { Schema, Document } from "mongoose";

export interface IRequirement extends Document {
  eventName: string;
  eventType: string;
  eventDate: Date;
  location: string;
  venue?: string;
  hiringCategory: "Planner" | "Performer" | "Crew";
  specificDetails?: Record<string, any>; // For category-specific data
  createdAt: Date;
}

const RequirementSchema: Schema = new Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    venue: { type: String },
    hiringCategory: { 
      type: String, 
      enum: ["Planner", "Performer", "Crew"], 
      required: true 
    },
    specificDetails: { type: Schema.Types.Mixed }, // Flexible field
  },
  { timestamps: true }
);

export default mongoose.model<IRequirement>("Requirement", RequirementSchema);