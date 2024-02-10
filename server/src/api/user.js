import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
  try {
    res.send("Hello, world! This is the user route.");
  } catch (error) {
    next(error);
  }
});

/* 
requires {username,password} 
returns {token,user}
*/
userRouter.post("/login", async (req, res, next) => {
  try {
    //extract username and password from request body
    const { username, password } = req.body;
    //find user in user table
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    //if user not found send error message
    if (!user)
      return res.status(200).send({ errorMessage: "Wrong Credentials" });
    //compare user db password with input password
    const checkPassword = await bcrypt.compare(password, user.password);
    //if password don't match send error message
    if (!checkPassword)
      return res.status(200).send({ errorMessage: "Wrong Credentials" });
    //create token to sign user
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    //send token and user data, use to store into session storage
    res.send({
      token,
      user: {
        id: user.id,
        name: user.firstname + " " + user.lastname,
        username: user.username,
        type: user.type,
      },
    });
  } catch (error) {
    next(error);
  }
});

/*
requires {firstname,lastname,username,password}
returns {token,user}
*/
userRouter.post("/register", async (req, res, next) => {
  try {
    //extract form data
    const { firstname, lastname, username, password } = req.body;
    //if user exists send error message
    const user = await prisma.users.findFirst({ where: { username } });
    if (user)
      return res.status(200).send({ errorMessage: "Account already exists" });
    //hash the password before storing into db
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    //add new user into db
    const newUser = await prisma.users.create({
      data: {
        firstname,
        lastname,
        username,
        password: hashedPassword,
        type: "customer",
      },
    });
    //provide user with token so they do not need to log in after registering
    const token = jwt.sign({ id: newUser.id }, process.env.JWT);
    //send back token and user data
    res.status(201).send({
      token,
      user: {
        id: newUser.id,
        name: firstname + " " + lastname,
        username,
        type: "customer",
      },
    });
  } catch (error) {
    next(error);
  }
});

/*
requires token
returns {cancelled,fulfilled,incart,user}
*/
userRouter.get("/me", async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    const { id } = req.user;
    //get user data from db
    const user = await prisma.users.findFirst({
      where: { id },
    });
    //remove password
    delete user.password;
    //get all fulfilled/cancelled/incart orders of user
    const orders = await prisma.orders.findMany({
      where: { userId: id },
    });
    //get all the order items of the orders
    const orderDetails = [];
    for (let order of orders) {
      orderDetails.push({
        order,
        items: await prisma.productsInOrder.findMany({
          where: { orderId: order.id },
        }),
      });
    }
    const orderDetailsWithDescriptions = [];
    //get the items description
    for (let orderDetail of orderDetails) {
      const itemInfo = [];
      for (let item of orderDetail.items) {
        itemInfo.push({
          ...item,
          itemDescription: await prisma.products.findFirst({
            where: { id: item.productId },
          }),
        });
      }
      orderDetailsWithDescriptions.push({ ...orderDetail.order, itemInfo });
    }
    //clean up orders by breaking into 3 [] cancelled, fulfilled, and incart
    const cancelled = [],
      fulfilled = [],
      incart = [];
    orderDetailsWithDescriptions.forEach((order) => {
      order.status === "cancelled"
        ? cancelled.push(order)
        : order.status === "fulfilled"
        ? fulfilled.push(order)
        : incart.push(order);
    });
    res.send({ cancelled, fulfilled, incart, user });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
