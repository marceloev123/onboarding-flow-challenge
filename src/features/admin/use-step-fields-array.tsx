import { type Control, useFieldArray } from "react-hook-form";
import { type FormValues } from "./use-admin-form";

export const useStepFieldsArray = (
  control: Control<FormValues>,
  stepIndex: number,
) => {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `steps.${stepIndex}.fields`,
  });

  return { fields, append, remove };
};
