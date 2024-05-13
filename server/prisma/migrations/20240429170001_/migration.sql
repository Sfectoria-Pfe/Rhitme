-- CreateTable
CREATE TABLE "Conversation" (
    "conversation_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "_ConversationToEmployee" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToEmployee_AB_unique" ON "_ConversationToEmployee"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToEmployee_B_index" ON "_ConversationToEmployee"("B");

-- AddForeignKey
ALTER TABLE "_ConversationToEmployee" ADD CONSTRAINT "_ConversationToEmployee_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToEmployee" ADD CONSTRAINT "_ConversationToEmployee_B_fkey" FOREIGN KEY ("B") REFERENCES "Employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;
