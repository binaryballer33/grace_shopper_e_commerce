/*
  Warnings:

  - Made the column `status` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "type" SET NOT NULL;
