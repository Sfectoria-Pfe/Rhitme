/*
  Warnings:

  - You are about to drop the column `CIN` on the `DepartedEmployee` table. All the data in the column will be lost.
  - Added the required column `cin` to the `DepartedEmployee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DepartedEmployee" DROP COLUMN "CIN",
ADD COLUMN     "cin" TEXT NOT NULL;
