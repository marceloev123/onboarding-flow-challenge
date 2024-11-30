import React from "react";
import { type Control, type ControllerRenderProps } from "react-hook-form";
import { CardContent } from "~/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { type FormValues } from "./use-onboarding-form";
import { Textarea } from "~/components/ui/textarea";
import { DatePicker } from "~/components/date-picker";
import { AddressInput } from "./address-input";

interface Props {
  fields: (keyof FormValues)[] | undefined;
  control: Control<FormValues>;
}

export const Step = ({ fields, control }: Props) => {
  const renderInput = (field: ControllerRenderProps<FormValues>) => {
    switch (field.name) {
      case "about":
        return (
          <Textarea
            placeholder="About"
            {...field}
            value={field.value as string}
          />
        );
      case "birthDate":
        return <DatePicker field={field} />;
      case "address":
        return <AddressInput control={control} />;
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
                <FormControl>{renderInput(field)}</FormControl>
                {itemField === "address" ? null : <FormMessage />}
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </>
  );
};
