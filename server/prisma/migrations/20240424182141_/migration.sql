/*
  Warnings:

  - You are about to drop the column `postal_code` on the `Address` table. All the data in the column will be lost.
  - Added the required column `zip` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "postal_code",
ADD COLUMN     "zip" TEXT NOT NULL;
