/*
  Warnings:

  - You are about to drop the column `y2020` on the `Yearly` table. All the data in the column will be lost.
  - You are about to drop the column `y2021` on the `Yearly` table. All the data in the column will be lost.
  - You are about to drop the column `y2020` on the `absenceYearly` table. All the data in the column will be lost.
  - You are about to drop the column `y2021` on the `absenceYearly` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Yearly" DROP COLUMN "y2020",
DROP COLUMN "y2021",
ADD COLUMN     "y2025" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "y2026" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "absenceYearly" DROP COLUMN "y2020",
DROP COLUMN "y2021",
ADD COLUMN     "y2025" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "y2026" INTEGER NOT NULL DEFAULT 0;
