/*
  Warnings:

  - Made the column `updated_on` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "updated_on" SET NOT NULL;
