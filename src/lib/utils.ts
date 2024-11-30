import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type UserDto } from "~/server/api/dto/users/response/user.dto";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatAddress = (address: UserDto["address"] | null) => {
  return !address
    ? "-"
    : `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
};

export const formatBirthDate = (birthDate: UserDto["birthDate"] | null) => {
  return !birthDate ? "-" : new Date(birthDate).toLocaleDateString();
};
