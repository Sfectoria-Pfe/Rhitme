-- DropForeignKey
ALTER TABLE "ReportReply" DROP CONSTRAINT "ReportReply_report_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_employee_id_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReportReply" ADD CONSTRAINT "ReportReply_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report"("report_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
