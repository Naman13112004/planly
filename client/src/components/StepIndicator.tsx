import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Event Details" },
  { id: 2, name: "Role Specifics" },
  { id: 3, name: "Review & Submit" },
];

export function StepIndicator({ currentStep }: StepProps) {
  return (
    <div className="flex justify-center items-center space-x-4 mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center">
            {/* Circle */}
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                isActive ? "border-primary bg-primary text-white scale-110" : 
                isCompleted ? "border-primary bg-primary text-white" : "border-muted-foreground/30 text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
            </div>
            
            {/* Line connector (except for last item) */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1 w-12 mx-2 rounded transition-all duration-500",
                  isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}