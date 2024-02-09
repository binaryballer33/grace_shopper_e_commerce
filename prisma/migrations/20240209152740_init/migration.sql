/*
  Warnings:

  - You are about to drop the `orderDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "orderStatus" ADD VALUE 'inCart';

-- DropForeignKey
ALTER TABLE "orderDetail" DROP CONSTRAINT "orderDetail_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orderDetail" DROP CONSTRAINT "orderDetail_productId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "orderDetail";

-- CreateTable
CREATE TABLE "orderProducts" (
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "orderProducts_pkey" PRIMARY KEY ("orderId","productId")
);

-- AddForeignKey
ALTER TABLE "orderProducts" ADD CONSTRAINT "orderProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderProducts" ADD CONSTRAINT "orderProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
