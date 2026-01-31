import { create } from "zustand";
import { RequirementFormValues } from "@/lib/schemas/requirementSchema";

interface FormState {
  currentStep: number;
  formData: Partial<RequirementFormValues>; // Partial because we build it up step by step
  
  // Actions
  setFormData: (data: Partial<RequirementFormValues>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  currentStep: 1,
  formData: {
    // Default values
    hiringCategory: "Planner", 
  },
  
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  resetForm: () => set({ currentStep: 1, formData: {} }),
}));