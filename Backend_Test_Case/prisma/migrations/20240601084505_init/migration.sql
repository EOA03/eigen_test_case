-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('ACTIVE', 'PENALTY');

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "MemberStatus" NOT NULL DEFAULT 'ACTIVE',
    "penalty_end_date" TIMESTAMP(3),
    "total_books" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowedBooks" (
    "id" SERIAL NOT NULL,
    "member_code" TEXT NOT NULL,
    "book_code" TEXT NOT NULL,
    "borrow_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),
    "returned_yet" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BorrowedBooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_code_key" ON "Books"("code");

-- CreateIndex
CREATE INDEX "idx_books_code" ON "Books"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Member_code_key" ON "Member"("code");

-- CreateIndex
CREATE INDEX "idx_member_code" ON "Member"("code");

-- CreateIndex
CREATE INDEX "idx_borrowedbook_member" ON "BorrowedBooks"("member_code");

-- AddForeignKey
ALTER TABLE "BorrowedBooks" ADD CONSTRAINT "BorrowedBooks_member_code_fkey" FOREIGN KEY ("member_code") REFERENCES "Member"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowedBooks" ADD CONSTRAINT "BorrowedBooks_book_code_fkey" FOREIGN KEY ("book_code") REFERENCES "Books"("code") ON DELETE CASCADE ON UPDATE CASCADE;
