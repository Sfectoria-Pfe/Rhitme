-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_department_id_fkey";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE CASCADE ON UPDATE CASCADE;
