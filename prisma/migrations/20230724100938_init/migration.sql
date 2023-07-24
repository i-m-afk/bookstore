/*
  Warnings:

  - A unique constraint covering the columns `[review_id,bookId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Made the column `bookId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookId_fkey";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "bookId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_review_id_bookId_key" ON "Review"("review_id", "bookId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
