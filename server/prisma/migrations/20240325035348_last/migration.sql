/*
  Warnings:

  - You are about to drop the column `extension` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `file_name` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employee_id]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "extension",
DROP COLUMN "file_name",
DROP COLUMN "path",
ADD COLUMN     "employee_id" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Media_employee_id_key" ON "Media"("employee_id");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
