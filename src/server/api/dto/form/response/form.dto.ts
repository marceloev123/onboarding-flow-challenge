import { FieldType } from "@prisma/client";
import { z } from "zod";

export const FormDto = z.array(
  z.object({
    fields: z.array(
      z.object({
        type: z.enum([FieldType.ABOUT, FieldType.ADDRESS, FieldType.BIRTHDATE]),
      }),
    ),
  }),
);

export type FormDto = z.infer<typeof FormDto>;
