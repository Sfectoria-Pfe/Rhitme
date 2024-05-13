/*
  Warnings:

  - The primary key for the `Subtask` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_pkey",
ALTER COLUMN "subtask_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subtask_pkey" PRIMARY KEY ("subtask_id");

-- CreateTable
CREATE TABLE "Offer" (
    "offer_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT[],
    "requirements" TEXT[],
    "experience" TEXT NOT NULL,
    "pay" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,
    "workdays" TEXT NOT NULL,
    "urgent" BOOLEAN NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("offer_id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "candidate_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cv" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("candidate_id")
);

-- CreateTable
CREATE TABLE "Post" (
    "offer_id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "accuracy" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_offer_id_candidate_id_key" ON "Post"("offer_id", "candidate_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offer"("offer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("candidate_id") ON DELETE RESTRICT ON UPDATE CASCADE;
