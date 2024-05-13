-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_department_head_fkey" FOREIGN KEY ("department_head") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
