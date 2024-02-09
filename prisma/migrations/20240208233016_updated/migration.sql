-- CreateEnum
CREATE TYPE "status" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateTable
CREATE TABLE "orderdetail" (
    "id" SERIAL NOT NULL,
    "orderid" INTEGER,
    "productid" INTEGER,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "orderdetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "count" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "type" "status",

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "orderdetail" ADD CONSTRAINT "orderdetail_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderdetail" ADD CONSTRAINT "orderdetail_productid_fkey" FOREIGN KEY ("productid") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
