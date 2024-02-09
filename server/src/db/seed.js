import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pkg from "pg";
import {
  fruit_descriptions,
  fruits,
  IMG_URL,
  fnames,
  lnames,
  orderDetails,
} from "./index.js";
const { Client } = pkg;
const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://andrewlin1368:@localhost:5432/ecommerce",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

async function resetDB() {
  try {
    console.log("dropping tables...");
    await client.query(
      `
      DROP TABLE IF EXISTS orderdetail;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      DROP TYPE IF EXISTS status
      `
    );
    console.log("done dropping tables\n");
  } catch (error) {
    console.error(error);
  }
}

async function recreateDB() {
  try {
    console.log("recreating db structures...");
    await client.query(
      `
    CREATE TYPE status AS ENUM (
      'ADMIN',
      'CUSTOMER'
    ); 
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      firstName varchar(255) NOT NULL,
      lastName varchar(255) NOT NULL,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      type status 
    );
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      description varchar(255) NOT NULL,
      image varchar(255) NOT NULL,
      count INTEGER NOT NULL,
      price INTEGER NOT NULL
    );
    CREATE TABLE orders (
      id  SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(id)
    );
    CREATE TABLE orderdetail (
      id SERIAL PRIMARY KEY,
      orderId INTEGER REFERENCES orders(id),
      productID INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL
    );
    `
    );
    console.log("done recreating db structures\n");
  } catch (error) {
    console.error(error);
  }
}

async function buildProducts() {
  try {
    console.log("building products table... ");
    for (let i = 0; i < 48; i++) {
      await prisma.products.create({
        data: {
          name: fruits[i],
          description: fruit_descriptions[i],
          image: IMG_URL,
          count: 80 - i,
          price: 20 + i,
        },
      });
    }
    console.log("done building products table\n");
  } catch (error) {
    console.error(error);
  }
}

async function buildUsers() {
  try {
    console.log("building users table for customers...");
    for (let i = 0; i < 5; i++) {
      await prisma.users.create({
        data: {
          firstname: fnames[i],
          lastname: lnames[i],
          username: fnames[i] + lnames[i] + i,
          password: "password",
          type: "CUSTOMER",
        },
      });
    }
    console.log("done building users table for customers\n");
    console.log("building users table for admin...");
    await prisma.users.create({
      data: {
        firstname: fnames[5],
        lastname: lnames[5],
        username: fnames[5] + lnames[5] + 5,
        password: "password",
        type: "ADMIN",
      },
    });
    console.log("done building users table for admin\n");
  } catch (error) {
    console.error(error);
  }
}

async function buildOrders() {
  try {
    console.log("building order table...");
    for (let i = 0; i < 4; i++) {
      await prisma.orders.create({
        data: {
          users: { connect: { id: i + 1 } },
        },
      });
    }
    console.log("done building order table\n");
  } catch (error) {
    console.error(error);
  }
}

async function buildOrderDetails() {
  try {
    console.log("building order detail table...");
    await prisma.orderdetail.createMany({
      data: orderDetails,
    });
    console.log("done building order detail table\n");
  } catch (error) {
    console.error(error);
  }
}

async function seed() {
  console.log(
    "if first time cloning project exit and run 'npx prisma migrate dev'..."
  );

  setTimeout(async () => {
    client.connect();
    console.log("db connection open...\n");
    await resetDB();
    await recreateDB();
    await buildProducts();
    await buildUsers();
    await buildOrders();
    await buildOrderDetails();
    client.end();
    console.log("db closed");
  }, 10000);
}

seed();
