/*
  Warnings:

  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('fulfilled', 'notFullfilled');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "orderStatus",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
