/*
  Warnings:

  - You are about to alter the column `phone` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(10);
