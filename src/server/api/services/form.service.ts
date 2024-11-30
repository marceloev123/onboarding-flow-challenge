import { type PrismaClient } from "@prisma/client";
import { type FormDto } from "../dto/form/response/form.dto";
import { type UpdateFormDto } from "../dto/form/request/update-form.dto";

export const FormService = (db: PrismaClient) => {
  return {
    findOne: async (): Promise<FormDto> => {
      const latestForm = await db.onboardingForm.findFirst({
        select: {
          steps: {
            include: {
              fields: true,
            },
          },
        },
      });

      const form = latestForm?.steps.map((step) => {
        return {
          fields: step.fields.map((field) => {
            return {
              type: field.type,
            };
          }),
        };
      });

      if (!form) {
        throw new Error("Form not found");
      }

      return form;
    },
    update: async (input: UpdateFormDto): Promise<FormDto> => {
      const form = await db.onboardingForm.findFirst({
        select: {
          id: true,
        },
      });

      if (!form) {
        throw new Error("Form not found");
      }

      const updatedForm = await db.onboardingForm.update({
        where: {
          id: form.id,
        },
        data: {
          steps: {
            deleteMany: {},
            create: input.steps.map((step, stepIndex) => {
              return {
                fields: {
                  create: step.fields.map((field, fieldIndex) => {
                    return {
                      type: field.type,
                      order: fieldIndex,
                    };
                  }),
                },
                order: stepIndex,
              };
            }),
          },
        },
        select: {
          steps: {
            include: {
              fields: true,
            },
          },
        },
      });

      return updatedForm.steps.map((step) => {
        return {
          fields: step.fields.map((field) => {
            return {
              type: field.type,
            };
          }),
        };
      });
    },
  };
};
