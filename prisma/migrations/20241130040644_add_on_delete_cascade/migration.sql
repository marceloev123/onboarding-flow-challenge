-- DropForeignKey
ALTER TABLE "fields" DROP CONSTRAINT "fields_stepId_fkey";

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
