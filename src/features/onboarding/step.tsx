import React from "react";
import {
  type FieldName,
  type Control,
  ControllerRenderProps,
} from "react-hook-form";
import { CardContent } from "~/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type FormValues } from "./use-onboarding-form";
import { Textarea } from "~/components/ui/textarea";
import { DatePicker } from "~/components/date-picker";

interface Props {
  fields: FieldName<FormValues>[] | undefined;
  control: Control<FormValues>;
}

type FieldType = "about" | "birthdate" | "address";

export const Step = ({ fields, control }: Props) => {
  const renderInput = (
    field: ControllerRenderProps<FormValues>,
    fieldType: FieldType,
  ) => {
    switch (fieldType) {
      case "about":
        return (
          <Textarea
            placeholder="About"
            {...field}
            value={field.value as string}
          />
        );
      case "birthdate":
        return <DatePicker field={field} />;
      case "address":
        return (
          <Input
            className="placeholder:capitalize"
            placeholder="Address"
            {...field}
            value={field.value as string}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <CardContent className="grid w-full items-center gap-4">
        {fields?.map((itemField) => (
          <FormField
            key={itemField}
            control={control}
            name={itemField}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{itemField}</FormLabel>
                <FormControl>
                  {renderInput(field, itemField as FieldType)}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </>
  );
};
