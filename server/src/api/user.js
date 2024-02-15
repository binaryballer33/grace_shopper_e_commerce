import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getOrders, createUser, checkAdmin } from "../db/index.js";
import prisma from "../db/index.js";
import { verifyToken } from "../middleware/middleware.js";
const userRouter = express.Router();

userRouter.get("/", verifyToken, async (req, res, next) => {
	try {
		if (!req.user) return res.send("User not logged in");

		if (!(await checkAdmin(req.user.id))) return res.send("Unauthorized");

		// get all users from db
		const users = await prisma.users.findMany();

		// remove password for each user
		users.forEach((user) => {
			delete user.password;
		});

		res.status(200).send({
			message: "Successfully Retrieved All Users",
			users: users,
		});
	} catch (error) {
		next(error);
	}
});

/*
 * requires { username, password }
 * returns { token, user }
 */
userRouter.post("/login", async (req, res, next) => {
	try {
		// extract username and password from request body
		const { username, password } = req.body;

		if (!username || !password)
			return res
				.status(400)
				.send("Please supply both a username and password");

		// find user in user table
		const user = await prisma.users.findFirst({
			where: {
				username,
			},
		});

		// if user not found send error message
		if (!user) {
			return res.status(400).send({
				message: "Username Or Password Is Incorrect",
				status: res.statusCode,
			});
		}

		// compare user db password with input password
		const checkPassword = await bcrypt.compare(password, user.password);

		// if password don't match send error message
		if (!checkPassword)
			return res.status(400).send({
				message: "Username Or Password Is Incorrect",
				status: res.statusCode,
			});

		// create token based on unique user id and secret key
		// eslint-disable-next-line no-undef
		const token = jwt.sign({ id: user.id }, process.env.JWT);

		// send token and user data, use to store into session storage
		delete user.password;
		res.status(200).send({
			message: "Login Successful",
			token,
			user,
		});
	} catch (error) {
		next(error);
	}
});

/*
 * requires { firstname, lastname, username, password}
 * returns { token, user }
 */
userRouter.post("/register", async (req, res, next) => {
	try {
		// extract form data from request body
		const { firstname, lastname, username, password } = req.body;

		// check if user already exists
		const user = await prisma.users.findFirst({ where: { username } });

		// if user exists send error message
		if (user)
			return res.status(400).send({
				message: "Account Already Exists",
				status: res.statusCode,
			});

		// hash the password before storing into db
		const hashedPassword = await bcrypt.hash(password, 10);

		// add new user into db
		const newUser = await createUser({
			firstname,
			lastname,
			username,
			password: hashedPassword,
			type: "customer",
		});

		// provide user with token so they do not need to log in after registering
		// eslint-disable-next-line no-undef
		const token = jwt.sign({ id: newUser.id }, process.env.JWT);

		// send back token and user data
		delete newUser.password;
		res.status(200).send({
			message: "Registration Successful",
			token,
			user: newUser,
		});
	} catch (error) {
		next(error);
	}
});

/*
 * requires token
 * returns { cancelled, fulfilled, incart, user }
 */
userRouter.get("/profile", verifyToken, async (req, res, next) => {
	try {
		// check if user is logged in
		if (!req.user) return res.send("User not logged in");

		// get user data from db
		const { id } = req.user;
		const user = await prisma.users.findFirst({
			where: { id },
		});

		// remove password
		delete user.password;
		const orders = await getOrders(id);

		res.status(200).send({
			message: `${user.firstname}'s Profile Has Been Retrieved Successfully`,
			orders,
			user,
		});
	} catch (error) {
		next(error);
	}
});

/*
 * admin only route to get other customers info and orders
 * requires id
 * returns { orders, user }
 */
userRouter.post("/orders", verifyToken, async (req, res, next) => {
	try {
		// check if user is logged in
		if (!req.user) return res.send("User not logged in");

		// check if user had admin rights
		if (!(await checkAdmin(req.user.id))) return res.send("Unauthorized");

		// get all orders of user
		const orders = await getOrders(req.body.id);

		// get user data
		const user = await prisma.users.findFirst({
			where: {
				id: req.body.id,
			},
		});

		// remove password from user data before sending it to client
		delete user.password;
		res.status(200).send({
			message: "Orders For User Retrieved Successfully",
			orders,
			user,
		});
	} catch (error) {
		next(error);
	}
});

export default userRouter;
