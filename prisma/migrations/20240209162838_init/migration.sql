/*
  Warnings:

  - You are about to drop the column `quantity` on the `orders` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `productsInOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "productsInOrder" ADD COLUMN     "quantity" INTEGER NOT NULL;
