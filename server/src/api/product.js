import express from "express";
import { getAllProducts, getProduct } from "../db/index.js";

const productRouter = express.Router();

// GET /products - Returns a list of all products
productRouter.get("/", async (req, res, next) => {
	try {
		const products = await getAllProducts();

		if (!products) return res.status(500).send("Failed To Get Products.");

		res.status(200).send({
			message: "Successfully Retrieved All Products",
			products: products,
		});
	} catch (error) {
		next(error);
	}
});

// GET /products/product/:id - Returns a single product by ID
productRouter.get("/product/:id", async (req, res, next) => {
	const { id } = req.params;

	try {
		const product = await getProduct(id);
		if (!product)
			return res
				.status(500)
				.send(`Failed To Get Products ${id}: ${product.name}`);

		res.status(200).send({
			message: `Successfully Retrieved Product ${id}: ${product.name}`,
			product: product,
		});
	} catch (error) {
		next(error);
	}
});

export default productRouter;
