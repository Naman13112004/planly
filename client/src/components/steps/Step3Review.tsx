"use client";

import { useState } from "react";
import { useFormStore } from "@/store/useFormStore";
import { createRequirement } from "@/services/requirementService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { RequirementFormValues } from "@/lib/schemas/requirementSchema";

export default function Step3Review() {
  const { formData, prevStep, resetForm } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Cast safely because Step 1 and 2 ensured data presence
      await createRequirement(formData as RequirementFormValues);
      setIsSuccess(true);
      // Wait a moment then reset
      setTimeout(() => {
        resetForm(); // Goes back to Step 1
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to submit. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-lg mx-auto animate-fade-in text-center py-10 shadow-lg border-t-4 border-t-green-500">
        <CardContent className="flex flex-col items-center gap-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold">Success!</h2>
          <p className="text-muted-foreground">Your {formData.hiringCategory} requirement has been posted.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto animate-slide-up shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>Review Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="font-semibold text-muted-foreground">Event:</span>
          <span>{formData.eventName}</span>
          
          <span className="font-semibold text-muted-foreground">Type:</span>
          <span>{formData.eventType}</span>
          
          <span className="font-semibold text-muted-foreground">Date:</span>
          <span>{formData.eventDate?.toLocaleDateString()}</span>
          
          <span className="font-semibold text-muted-foreground">Category:</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded w-fit text-xs font-bold uppercase">{formData.hiringCategory}</span>
        </div>
        
        <div className="bg-muted p-4 rounded-md text-sm">
          <p className="font-semibold mb-2">Specifics:</p>
          <pre className="whitespace-pre-wrap font-sans text-muted-foreground">
            {JSON.stringify(formData.specificDetails, null, 2).replace(/{|}|"/g, '')}
          </pre>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" onClick={prevStep} className="w-1/2" disabled={isSubmitting}>Back</Button>
        <Button onClick={handleSubmit} className="w-1/2" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Submitting..." : "Confirm Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}