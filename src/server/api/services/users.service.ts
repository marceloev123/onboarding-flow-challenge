import { type PrismaClient } from "@prisma/client";
import { type CreateUserDto } from "../dto/users/request/create-user.dto";
import { type UserDto } from "../dto/users/response/user.dto";
import { hashPassword } from "~/server/utils";

export const UsersService = (db: PrismaClient) => {
  return {
    find: async (): Promise<UserDto[]> => {
      return db.user.findMany({
        select: {
          id: true,
          email: true,
          address: true,
          birthDate: true,
          about: true,
        },
      });
    },
    upsert: async (input: CreateUserDto): Promise<UserDto> => {
      let hashedPassword = input.password;

      try {
        hashedPassword = await hashPassword(input.password);
      } catch (error) {
        console.error(error);
        throw new Error("Error hashing password");
      }

      const findUser = await db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (findUser) {
        return db.user.update({
          where: {
            email: input.email,
          },
          include: {
            address: true,
          },
          data: {
            ...(input.address && {
              address: {
                create: {
                  street: input.address.street,
                  city: input.address.city,
                  zip: input.address.zip,
                  state: input.address.state,
                },
              },
            }),
            birthDate: input.birthDate,
            about: input.about,
          },
        });
      }

      return db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
        include: {
          address: true,
        },
      });
    },
  };
};
