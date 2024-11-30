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
import { Loader2 } from "lucide-react";
import { type FormValues, useOnboardingForm } from "./use-onboarding-form";
import { Form } from "~/components/ui/form";
import { FirstStep } from "./first-step";
import { Step } from "./step";
import { api } from "~/utils/api";
import { useToast } from "~/hooks/use-toast";

const steps: Array<{ fields: (keyof FormValues)[]; order: number }> = [
  {
    fields: ["email", "password"],
    order: 1,
  },
  {
    fields: ["address", "birthDate"],
    order: 2,
  },
  {
    fields: ["about"],
    order: 3,
  },
];

export const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useOnboardingForm();
  const { handleSubmit, trigger, reset, getValues } = form;

  const utils = api.useUtils();

  const { isPending, isSuccess, mutateAsync } = api.user.upsert.useMutation({
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save data",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      // Invalidate user cache
      await utils.user.find.refetch();
    },
  });

  const { toast } = useToast();

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onResetForm = () => {
    reset();
    setCurrentStep(0);
  };

  const onSubmit = async (formData: FormValues) => {
    // Upsert user with all form data
    try {
      await mutateAsync({ ...formData });
      if (isSuccess) {
        toast({
          title: "Success",
          description: "Data saved successfully",
          variant: "default",
        });
      }
    } catch (error) {
      // Send error to error tracking service
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save data",
        variant: "destructive",
      });
    }
    onResetForm();
  };

  const onNext = async () => {
    const currentFields = steps[currentStep]?.fields;

    if (!currentFields) return;

    const isValid = await trigger(currentFields, { shouldFocus: true });

    if (!isValid) return;

    if (currentStep === steps.length - 1) {
      await handleSubmit(onSubmit)();
    } else {
      const currentValues = getValues();
      try {
        // Upsert user with current step data
        await mutateAsync({ ...currentValues });
      } catch (error) {
        // Send error to error tracking service
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to save data",
          variant: "destructive",
        });
      }

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
          <CardDescription>Fill the fields below to begin</CardDescription>
        </CardHeader>
        <Form {...form}>
          <CardContent className="grid w-full items-center gap-4">
            {renderStep()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentStep < 1}
              onClick={handlePrevious}
            >
              Previous
            </Button>

            <Button onClick={onNext} disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : null}
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
};
