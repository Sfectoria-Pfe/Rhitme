-- CreateTable
CREATE TABLE "DepartedEmployee" (
    "employee_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "CIN" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "photo" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "skills" TEXT[],
    "salary" TEXT NOT NULL,
    "date_left" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "DepartedEmployee_pkey" PRIMARY KEY ("employee_id")
);
