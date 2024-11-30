import { zodResolver } from "@hookform/resolvers/zod";
import { FieldType } from "@prisma/client";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const adminFormSchema = z.object({
  steps: z.array(
    z.object({
      fields: z
        .array(
          z
            .object({
              type: z.enum([
                FieldType.ABOUT,
                FieldType.ADDRESS,
                FieldType.BIRTHDATE,
              ]),
            })
            .nullish(),
        )
        .min(1)
        .max(2),
    }),
  ),
});

export type FormValues = z.infer<typeof adminFormSchema>;

const adminFormResolver = zodResolver(adminFormSchema, undefined, {
  raw: true,
});

export const useAdminForm = () => {
  const form = useForm<FormValues>({
    mode: "onSubmit",
    resolver: adminFormResolver,
    defaultValues: {
      steps: [
        {
          fields: [{}],
        },
        { fields: [{}] },
      ],
    },
  });

  const { fields: stepFields } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  return { form, stepFields };
};
