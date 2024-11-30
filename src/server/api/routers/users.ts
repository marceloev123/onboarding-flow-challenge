import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CreateUserDto } from "../dto/users/request/create-user.dto";
import { UsersService } from "../services/users.service";

export const userRouter = createTRPCRouter({
  find: publicProcedure.query(async ({ ctx }) => {
    return UsersService(ctx.db).find();
  }),

  upsert: publicProcedure
    .input(CreateUserDto)
    .mutation(async ({ ctx, input }) => {
      return UsersService(ctx.db).upsert(input);
    }),
});
