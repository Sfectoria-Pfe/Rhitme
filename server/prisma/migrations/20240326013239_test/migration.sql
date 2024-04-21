/*
  Warnings:

  - You are about to drop the column `employee_id` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_employee_id_fkey";

-- DropIndex
DROP INDEX "Media_employee_id_key";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "employee_id";
