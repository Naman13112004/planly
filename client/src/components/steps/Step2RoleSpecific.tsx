"use client";

import { useForm } from "react-hook-form";
import { useFormStore } from "@/store/useFormStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardDescription 
} from "@/components/ui/card";

export default function Step2RoleSpecific() {
  const { formData, setFormData, nextStep, prevStep } = useFormStore();
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      specificDetails: formData.specificDetails || {},
    },
  });

  const category = formData.hiringCategory;

  const onSubmit = (data: any) => {
    // Merge the specific details into the main store
    setFormData({ specificDetails: data.specificDetails });
    nextStep();
  };

  // Dynamic Content Logic
  const renderDynamicFields = () => {
    switch (category) {
      case "Planner":
        return (
          <div className="space-y-2 animate-fade-in">
            <Label>Estimated Budget</Label>
            <Input {...register("specificDetails.budget")} placeholder="e.g. $5,000 - $10,000" required />
            <p className="text-xs text-muted-foreground">Planners need to know the scale of the event.</p>
          </div>
        );
      case "Performer":
        return (
          <div className="space-y-2 animate-fade-in">
            <Label>Performance Duration (Hours)</Label>
            <Input {...register("specificDetails.duration")} type="number" placeholder="e.g. 2" required />
            <p className="text-xs text-muted-foreground">How long should the set list be?</p>
          </div>
        );
      case "Crew":
        return (
          <div className="space-y-2 animate-fade-in">
            <Label>Equipment Provided?</Label>
            <Input {...register("specificDetails.equipment")} placeholder="e.g. We have sound, need lights" required />
            <p className="text-xs text-muted-foreground">Specify what gear is already on site.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto animate-slide-up shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>{category} Requirements</CardTitle>
        <CardDescription>Tell us more about the {category} role.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderDynamicFields()}
          
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={prevStep} className="w-1/2">Back</Button>
            <Button type="submit" className="w-1/2">Next</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}