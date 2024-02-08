import express from "express";

const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
	try {
		res.send("Hello, world! This is the product route.");
	} catch (error) {
		next(error);
	}
});

export default productRouter;
