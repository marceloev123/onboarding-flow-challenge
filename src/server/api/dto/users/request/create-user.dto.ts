import { z } from "zod";

export const CreateUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      zip: z.string(),
      state: z.string(),
    })
    .optional(),
  birthDate: z.coerce.date().optional(),
  about: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
