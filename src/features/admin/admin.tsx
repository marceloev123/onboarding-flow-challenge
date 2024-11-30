import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { type FormValues, useAdminForm } from "./use-admin-form";
import { StepFieldsForm } from "./step-fields-form";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { useToast } from "~/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const AdminPage = () => {
  const { form, stepFields } = useAdminForm();
  const { toast } = useToast();
  const utils = api.useUtils();

  const { isPending, mutateAsync } = api.form.update.useMutation({
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save form data",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      // Invalidate form cache
      toast({
        title: "Success",
        description: "Form data saved successfully",
        variant: "default",
      });
      await utils.form.findOne.refetch();
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (formData: FormValues) => {
    try {
      await mutateAsync({
        steps: formData.steps.map((step) => ({
          fields: step.fields.map((field) => ({
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            type: field?.type!,
          })),
        })),
      });
    } catch (error) {
      // Send error to error tracking service
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save form data",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin</CardTitle>
            <CardDescription>Manage your onboarding flow</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {stepFields.map((stepField, stepFieldIndex) => (
              <Card key={stepFieldIndex}>
                <CardHeader>
                  <CardTitle>Step {stepFieldIndex + 2}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {stepField.fields?.map((field, fieldIndex) => (
                    <Card key={fieldIndex} className="p-4">
                      <CardContent className="flex flex-col gap-4">
                        <StepFieldsForm stepIndex={stepFieldIndex} />
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="mt-4 flex flex-row justify-end gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : null}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
