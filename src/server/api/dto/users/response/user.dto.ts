import { z } from "zod";

export const UserDto = z.object({
  id: z.string(),
  email: z.string().email(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
      state: z.string(),
    })
    .nullable(),
  birthDate: z.coerce.date().nullable(),
  about: z.string().nullable(),
});

export type UserDto = z.infer<typeof UserDto>;
