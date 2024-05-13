-- CreateTable
CREATE TABLE "Comment" (
    "comment_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "task_id" TEXT NOT NULL,
    "commentator_id" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "Subtask" (
    "subtask_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "task_id" TEXT NOT NULL,

    CONSTRAINT "Subtask_pkey" PRIMARY KEY ("subtask_id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentator_id_fkey" FOREIGN KEY ("commentator_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;
