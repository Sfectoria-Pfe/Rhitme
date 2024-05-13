/*
  Warnings:

  - You are about to drop the column `nb_absence` on the `Employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[monthly_abs]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Yearly_abs]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Yearly_abs` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthly_abs` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "nb_absence",
ADD COLUMN     "Yearly_abs" TEXT NOT NULL,
ADD COLUMN     "monthly_abs" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "absenceMonthly" (
    "mabs_id" TEXT NOT NULL,
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

    CONSTRAINT "absenceMonthly_pkey" PRIMARY KEY ("mabs_id")
);

-- CreateTable
CREATE TABLE "absenceYearly" (
    "yabs_id" TEXT NOT NULL,
    "y2020" INTEGER NOT NULL DEFAULT 0,
    "y2021" INTEGER NOT NULL DEFAULT 0,
    "y2023" INTEGER NOT NULL DEFAULT 0,
    "y2024" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "absenceYearly_pkey" PRIMARY KEY ("yabs_id")
);

-- CreateTable
CREATE TABLE "absence" (
    "absence_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "justificated" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "absence_pkey" PRIMARY KEY ("absence_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_monthly_abs_key" ON "Employees"("monthly_abs");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_Yearly_abs_key" ON "Employees"("Yearly_abs");

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_monthly_abs_fkey" FOREIGN KEY ("monthly_abs") REFERENCES "absenceMonthly"("mabs_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_Yearly_abs_fkey" FOREIGN KEY ("Yearly_abs") REFERENCES "absenceYearly"("yabs_id") ON DELETE RESTRICT ON UPDATE CASCADE;
