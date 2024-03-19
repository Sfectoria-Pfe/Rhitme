/*
  Warnings:

  - You are about to drop the `Noth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Noth";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Reports" (
    "report_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "receiver" TEXT,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "Badgeuse" (
    "badgeuse_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_start" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Badgeuse_pkey" PRIMARY KEY ("badgeuse_id")
);

-- CreateTable
CREATE TABLE "Media" (
    "media_id" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "Events" (
    "event_id" TEXT NOT NULL,
    "coordinator" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "EventParticipants" (
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "EventParticipants_pkey" PRIMARY KEY ("user_id","event_id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "user_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "CIN" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "points" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "nb_absence" INTEGER NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "department_id" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "permission" JSONB NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Participants" (
    "conversation_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("conversation_id","user_id")
);

-- CreateTable
CREATE TABLE "Conversations" (
    "conversation_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "message_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Offers" (
    "offer_id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT[],

    CONSTRAINT "Offers_pkey" PRIMARY KEY ("offer_id")
);

-- CreateTable
CREATE TABLE "Candidates" (
    "candidate_id" TEXT NOT NULL,
    "cv" TEXT NOT NULL,
    "accuracy" INTEGER NOT NULL,

    CONSTRAINT "Candidates_pkey" PRIMARY KEY ("candidate_id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "offer_id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("offer_id","candidate_id")
);

-- CreateTable
CREATE TABLE "Leaves" (
    "leave_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leaves_pkey" PRIMARY KEY ("leave_id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "project_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "starting" TIMESTAMP(3) NOT NULL,
    "ending" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "task_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "starting" TIMESTAMP(3) NOT NULL,
    "ending" TIMESTAMP(3) NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_CIN_key" ON "Employees"("CIN");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badgeuse" ADD CONSTRAINT "Badgeuse_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversations"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversations"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offers"("offer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("candidate_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaves" ADD CONSTRAINT "Leaves_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Employees"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
