/*
  Warnings:

  - You are about to drop the column `customersId` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[review_id,customerId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_customersId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "customersId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_review_id_customerId_key" ON "Review"("review_id", "customerId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
