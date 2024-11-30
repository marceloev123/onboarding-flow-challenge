import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { FormService } from "../services/form.service";
import { UpdateFormDto } from "../dto/form/request/update-form.dto";

export const formRouter = createTRPCRouter({
  findOne: publicProcedure.query(async ({ ctx }) => {
    return FormService(ctx.db).findOne();
  }),

  update: publicProcedure
    .input(UpdateFormDto)
    .mutation(async ({ ctx, input }) => {
      return FormService(ctx.db).update(input);
    }),
});
