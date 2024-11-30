import { z } from "zod";

export const UpdateFormDto = z.object({
  steps: z.array(
    z.object({
      fields: z.array(
        z.object({
          type: z.enum(["ABOUT", "ADDRESS", "BIRTHDATE"]),
        }),
      ),
    }),
  ),
});

export type UpdateFormDto = z.infer<typeof UpdateFormDto>;
