import { FieldTypeObject } from "~/lib/types";
import { type FormDto } from "~/server/api/dto/form/response/form.dto";
import { type FormValues } from "./use-onboarding-form";

export const getParsedStepsData = (data: FormDto | undefined) => {
  const parsedSteps = data?.map((step) => ({
    fields: step.fields.map(
      (field) => FieldTypeObject[field.type] as keyof FormValues,
    ),
  }));

  const steps: Array<{ fields: (keyof FormValues)[] }> = [
    {
      fields: ["email", "password"],
    },
    ...(parsedSteps ?? []),
  ];

  return steps;
};
