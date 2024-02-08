import express from "express";

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
	try {
		res.send("Hello, world! This is the user route.");
	} catch (error) {
		next(error);
	}
});

export default userRouter;
