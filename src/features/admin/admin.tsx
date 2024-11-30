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

export const AdminPage = () => {
  const { form, stepFields } = useAdminForm();

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  console.log({ errors });

  const onSubmit = (formData: FormValues) => {
    console.log({ formData });
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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};
