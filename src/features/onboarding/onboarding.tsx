import React, { useEffect, useState } from "react";
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
import { FormSkeleton } from "./form-skeleton";
import { getParsedStepsData } from "./get-parsed-steps-data";

export const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSafeToReset, setIsSafeToReset] = useState(false);

  const form = useOnboardingForm();
  const { trigger, reset, watch } = form;
  const { toast } = useToast();

  const utils = api.useUtils();

  const { isPending: isFormDatePending, data } = api.form.findOne.useQuery();

  const steps = getParsedStepsData(data);

  const { isPending, mutateAsync } = api.user.upsert.useMutation({
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save user data",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      // Invalidate user cache
      await utils.user.find.refetch();
    },
  });

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onResetForm = () => {
    setIsSafeToReset(false);
    setCurrentStep(0);
  };

  const onSubmit = async (formData: FormValues) => {
    // Upsert user with all form data
    try {
      const updatedUser = await mutateAsync({ ...formData });

      if (updatedUser.id) {
        setIsSafeToReset(true);

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
        description: "Failed to save user data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isSafeToReset) {
      reset({
        email: "",
        password: "",
      });
      onResetForm();
    }
  }, [isSafeToReset, reset]);

  if (isFormDatePending || !steps) return <FormSkeleton />;

  const currentValues = watch();

  const onNext = async () => {
    const currentFields = steps[currentStep]?.fields;
    if (!currentFields) return;

    const isValid = await trigger(currentFields, { shouldFocus: true });
    if (!isValid) return;

    if (currentStep === steps.length - 1) {
      await onSubmit({ ...currentValues });
    } else {
      try {
        // Upsert user with current step data
        await mutateAsync({ ...currentValues });
      } catch (error) {
        // Send error to error tracking service
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to save user data",
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
          <CardFooter className="flex justify-end">
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
