/*
  Warnings:

  - You are about to drop the column `createdAt` on the `orderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `orderDetail` table. All the data in the column will be lost.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderDetail" DROP COLUMN "createdAt",
DROP COLUMN "status",
DROP COLUMN "total";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "orderStatus" NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
