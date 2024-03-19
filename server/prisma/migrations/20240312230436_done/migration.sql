/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Employees` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employee_id]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "phone_number",
DROP COLUMN "photo",
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "employee_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Media_employee_id_key" ON "Media"("employee_id");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
