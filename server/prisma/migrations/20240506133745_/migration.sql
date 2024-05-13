-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
