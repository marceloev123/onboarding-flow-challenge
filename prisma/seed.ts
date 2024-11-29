import { FieldType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.field.createMany({
    data: [
      { order: 0, type: FieldType.ABOUT },
      { order: 0, type: FieldType.ADDRESS },
      { order: 0, type: FieldType.BIRTHDATE },
    ],
  });

  const firstStep = await prisma.step.create({
    data: {
      order: 0,
    },
  });

  const secondStep = await prisma.step.create({
    data: {
      order: 0,
    },
  });

  await prisma.onboardingForm.create({
    data: {
      step: {
        connect: [
          {
            id: firstStep.id,
          },
          {
            id: secondStep.id,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
