-- CreateTable
CREATE TABLE "ReportReply" (
    "report_reply_id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "ReportReply_pkey" PRIMARY KEY ("report_reply_id")
);

-- AddForeignKey
ALTER TABLE "ReportReply" ADD CONSTRAINT "ReportReply_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report"("report_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportReply" ADD CONSTRAINT "ReportReply_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
