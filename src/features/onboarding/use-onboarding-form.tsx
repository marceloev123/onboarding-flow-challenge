import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const onboardingFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
    state: z.string(),
  }),
  birthDate: z.coerce.date(),
  about: z.string(),
});

export type FormValues = z.infer<typeof onboardingFormSchema>;

const onboardingFormResolver = zodResolver(onboardingFormSchema, undefined, {
  raw: true,
});

export const useOnboardingForm = () => {
  const form = useForm<FormValues>({
    mode: "onSubmit",
    resolver: onboardingFormResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return form;
};
