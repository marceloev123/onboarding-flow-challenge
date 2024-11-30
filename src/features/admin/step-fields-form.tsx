import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { type FormValues } from "./use-admin-form";
import { useStepFieldsArray } from "./use-step-fields-array";
import { FieldType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";

interface Props {
  stepIndex: number;
}

export const StepFieldsForm = ({ stepIndex }: Props) => {
  const { control, getValues } = useFormContext<FormValues>();
  const { fields, append, remove } = useStepFieldsArray(control, stepIndex);

  const onAddField = () => {
    append(undefined);
  };

  const onRemoveField = (index: number) => {
    remove(index);
  };

  const values = getValues().steps;

  const fieldsValues = values.flatMap((step) =>
    step.fields.map((field) => field?.type),
  );

  return (
    <>
      {fields.map((fieldItem, fieldIndex) => (
        <FormField
          key={fieldItem.id}
          control={control}
          name={`steps.${stepIndex}.fields.${fieldIndex}.type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Type</FormLabel>
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="w-[85%]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a field type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value={FieldType.ADDRESS}
                        disabled={fieldsValues?.some(
                          (item) => item === FieldType.ADDRESS,
                        )}
                      >
                        Address
                      </SelectItem>
                      <SelectItem
                        value={FieldType.ABOUT}
                        disabled={fieldsValues?.some(
                          (item) => item === FieldType.ABOUT,
                        )}
                      >
                        About
                      </SelectItem>
                      <SelectItem
                        value={FieldType.BIRTHDATE}
                        disabled={fieldsValues?.some(
                          (item) => item === FieldType.BIRTHDATE,
                        )}
                      >
                        Birth Date
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-row gap-4">
                  {fieldIndex < 1 &&
                  fields.length < 2 &&
                  fieldsValues.length < 3 ? (
                    <Button
                      variant="ghost"
                      className="w-6"
                      type="button"
                      onClick={onAddField}
                    >
                      <PlusCircleIcon className="h-6 w-6" />
                    </Button>
                  ) : null}
                  {fieldIndex !== 0 ? (
                    <Button
                      variant="ghost"
                      type="button"
                      className="w-6"
                      onClick={() => onRemoveField(fieldIndex)}
                    >
                      <MinusCircleIcon className="h-6 w-6" />
                    </Button>
                  ) : null}
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};
