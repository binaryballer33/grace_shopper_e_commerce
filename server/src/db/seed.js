import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const IMG_URL =
  "https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg";

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const orderDetails = [
  {
    orderId: 1,
    productId: 2,
    quantity: 2,
  },
  {
    orderId: 1,
    productId: 4,
    quantity: 3,
  },
  {
    orderId: 1,
    productId: 12,
    quantity: 5,
  },
  {
    orderId: 2,
    productId: 2,
    quantity: 1,
  },
  {
    orderId: 2,
    productId: 20,
    quantity: 3,
  },
  {
    orderId: 3,
    productId: 1,
    quantity: 5,
  },
  {
    orderId: 3,
    productId: 18,
    quantity: 3,
  },
  {
    orderId: 4,
    productId: 18,
    quantity: 1,
  },
];

async function buildProducts() {
  try {
    console.log("building products table... ");
    for (let i = 0; i < 26; i++) {
      await prisma.product.create({
        data: {
          name: `product ${letters[i]}`,
          description: `product ${letters[i]} is rare and cool.`,
          image: IMG_URL,
          count: 100,
          price: 50,
        },
      });
    }
    console.log("done building products table");
  } catch (error) {
    console.error(error);
  }
}

async function buildUsers() {
  try {
    console.log("building users table for customers...");
    for (let i = 0; i < 10; i++) {
      await prisma.user.create({
        data: {
          firstName: "first" + letters[i],
          lastName: "last" + letters[i],
          username: "user" + letters[i],
          password: "password",
          type: "customer",
        },
      });
    }
    console.log("done building users table for customers");
    console.log("building users table for admin...");
    await prisma.user.create({
      data: {
        firstName: "first" + letters[25],
        lastName: "last" + letters[25],
        username: "user" + letters[25],
        password: "password",
        type: "admin",
      },
    });
    console.log("done building users table for admin");
  } catch (error) {
    console.error(error);
  }
}

async function buildOrders() {
  try {
    console.log("building order table...");
    for (let i = 0; i < 4; i++) {
      await prisma.order.create({
        data: {
          user: { connect: { id: i + 1 } },
        },
      });
    }
    console.log("done building order table");
  } catch (error) {
    console.error(error);
  }
}

async function buildOrderDetails() {
  try {
    console.log("building order detail table...");
    await prisma.orderDetail.createMany({
      data: orderDetails,
    });
    console.log("done building order detail table");
  } catch (error) {
    console.error(error);
  }
}

async function buildDB() {
  console.log("starting to build DB...");
  await buildProducts();
  await buildUsers();
  await buildOrders();
  await buildOrderDetails();
  console.log("done building DB");
}

buildDB();
