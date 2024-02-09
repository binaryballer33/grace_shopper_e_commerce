/*
  Warnings:

  - The values [notFullfilled] on the enum `orderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "orderStatus_new" AS ENUM ('fulfilled', 'cancelled');
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "orderStatus_new" USING ("status"::text::"orderStatus_new");
ALTER TYPE "orderStatus" RENAME TO "orderStatus_old";
ALTER TYPE "orderStatus_new" RENAME TO "orderStatus";
DROP TYPE "orderStatus_old";
COMMIT;
