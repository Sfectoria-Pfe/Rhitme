-- CreateTable
CREATE TABLE "Department" (
    "department_id" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,
    "department_head" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "employee_id" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Year" (
    "year_id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "monthly_absences" INTEGER[],
    "monthly_points" INTEGER[],
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("year_id")
);

-- CreateTable
CREATE TABLE "Report" (
    "report_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "receiver_id" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "address_id" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "skills" TEXT[],
    "last_opened" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_department_head_key" ON "Department"("department_head");

-- CreateIndex
CREATE UNIQUE INDEX "Address_employee_id_key" ON "Address"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_cin_key" ON "Employee"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Year" ADD CONSTRAINT "Year_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
