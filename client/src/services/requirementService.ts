import api from "@/lib/axios";
import { RequirementFormValues } from "@/lib/schemas/requirementSchema";

export const createRequirement = async (data: RequirementFormValues) => {
  // Convert Date object to ISO string for the backend
  const payload = {
    ...data,
    eventDate: data.eventDate.toISOString(),
  };

  const response = await api.post("/requirements", payload);
  return response.data;
};