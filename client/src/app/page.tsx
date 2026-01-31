"use client";

import { useFormStore } from "@/store/useFormStore";
import { StepIndicator } from "@/components/StepIndicator";
import Step1BasicInfo from "@/components/steps/Step1BasicInfo";
import Step2RoleSpecific from "@/components/steps/Step2RoleSpecific";
import Step3Review from "@/components/steps/Step3Review";

export default function Home() {
  const { currentStep } = useFormStore();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Planly</h1>
          <p className="text-slate-500">Post your event requirements in 3 simple steps.</p>
        </div>

        <StepIndicator currentStep={currentStep} />

        <div className="mt-6">
          {currentStep === 1 && <Step1BasicInfo />}
          {currentStep === 2 && <Step2RoleSpecific />}
          {currentStep === 3 && <Step3Review />}
        </div>
      </div>
    </main>
  );
}