/*
  Warnings:

  - You are about to drop the column `address` on the `Employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[monthly_id]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Yearly_id]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departed_id]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Yearly_id` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthly_id` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "address",
ADD COLUMN     "Yearly_id" TEXT NOT NULL,
ADD COLUMN     "address_id" TEXT NOT NULL,
ADD COLUMN     "monthly_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "departed_id" TEXT;

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "recipientId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Monthly" (
    "month_id" TEXT NOT NULL,
    "January" INTEGER NOT NULL,
    "February" INTEGER NOT NULL,
    "March" INTEGER NOT NULL,
    "April" INTEGER NOT NULL,
    "May" INTEGER NOT NULL,
    "June" INTEGER NOT NULL,
    "July" INTEGER NOT NULL,
    "August" INTEGER NOT NULL,
    "September" INTEGER NOT NULL,
    "October" INTEGER NOT NULL,
    "November" INTEGER NOT NULL,
    "December" INTEGER NOT NULL,

    CONSTRAINT "Monthly_pkey" PRIMARY KEY ("month_id")
);

-- CreateTable
CREATE TABLE "Yearly" (
    "year_id" TEXT NOT NULL,
    "y2020" INTEGER NOT NULL,
    "y2021" INTEGER NOT NULL,
    "y2023" INTEGER NOT NULL,
    "y2024" INTEGER NOT NULL,

    CONSTRAINT "Yearly_pkey" PRIMARY KEY ("year_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "DepartedEmployee" (
    "departed_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "marital_Status" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "date_left" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "DepartedEmployee_pkey" PRIMARY KEY ("departed_id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id_note" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id_note")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_address_id_key" ON "Employees"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_monthly_id_key" ON "Employees"("monthly_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_Yearly_id_key" ON "Employees"("Yearly_id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_departed_id_key" ON "Media"("departed_id");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_departed_id_fkey" FOREIGN KEY ("departed_id") REFERENCES "DepartedEmployee"("departed_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_monthly_id_fkey" FOREIGN KEY ("monthly_id") REFERENCES "Monthly"("month_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_Yearly_id_fkey" FOREIGN KEY ("Yearly_id") REFERENCES "Yearly"("year_id") ON DELETE RESTRICT ON UPDATE CASCADE;
