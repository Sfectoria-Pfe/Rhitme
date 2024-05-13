-- CreateTable
CREATE TABLE "Absence" (
    "absence_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "justificated" BOOLEAN NOT NULL,
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("absence_id")
);

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;
