import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type FormValues, useOnboardingForm } from "./use-onboarding-form";
import { type FieldName } from "react-hook-form";
import { Form } from "~/components/ui/form";
import { FirstStep } from "./first-step";
import { Step } from "./step";

const steps: Array<{ fields: FieldName<FormValues>[]; order: number }> = [
  {
    fields: ["email", "password"],
    order: 1,
  },
  {
    fields: ["address", "birthdate"],
    order: 2,
  },
  {
    fields: ["about"],
    order: 3,
  },
];

export const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const form = useOnboardingForm();

  const { handleSubmit, trigger, reset } = form;

  const onSubmit = async (formData: FormValues) => {
    console.log(formData);
    reset();
    setCurrentStep(0);
  };

  const onNext = async () => {
    const currentFields = steps[currentStep]?.fields;

    if (!currentFields) return;

    const isValid = await trigger(currentFields, { shouldFocus: true });

    if (!isValid) return;

    if (currentStep === steps.length - 1) {
      await handleSubmit(onSubmit)();
    } else {
      handleNext();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep control={form.control} />;
      case 1:
        return (
          <Step fields={steps[currentStep]?.fields} control={form.control} />
        );
      case 2:
        return (
          <Step fields={steps[currentStep]?.fields} control={form.control} />
        );
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-[480px]">
        <CardHeader>
          <CardTitle>Onboarding Users</CardTitle>
          <CardDescription>Register your new user</CardDescription>
        </CardHeader>
        <Form {...form}>
          <CardContent className="grid w-full items-center gap-4">
            {renderStep()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentStep < 0}
              onClick={handlePrevious}
            >
              Previous
            </Button>

            <Button onClick={onNext}>
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
};
