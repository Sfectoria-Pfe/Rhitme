/*
  Warnings:

  - A unique constraint covering the columns `[employee_id]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "employee_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Media_employee_id_key" ON "Media"("employee_id");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
