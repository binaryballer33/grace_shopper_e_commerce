import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getOrders, createUser } from "../db/index.js";
import prisma from "../db/index.js";
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
    const newUser = await createUser({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      type: "customer",
    });
    // const newUser = await prisma.users.create({
    //   data: {
    //     firstname,
    //     lastname,
    //     username,
    //     password: hashedPassword,
    //     type: "customer",
    //   },
    // });
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
    const orders = await getOrders(id);
    res.send({ orders, user });
  } catch (error) {
    next(error);
  }
});

/*admin only route to get other customers info and orders
requires id
returns {orders,user}
*/
userRouter.post("/orders", async (req, res, next) => {
  try {
    //check if user is logged in
    if (!req.user) return res.send("User not logged in");
    //check if user had admin rights
    const admin = await prisma.users.findFirst({
      where: {
        id: req.user.id,
      },
    });
    if (admin.type !== "admin") return res.send("Unauthorized");
    //get all orders of user
    const orders = await getOrders(req.body.id);
    //get user data
    const user = await prisma.users.findFirst({
      where: {
        id: req.body.id,
      },
    });
    //remove password
    delete user.password;
    res.send({ orders, user });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
