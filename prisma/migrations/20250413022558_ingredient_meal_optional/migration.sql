-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_mealId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "mealId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
