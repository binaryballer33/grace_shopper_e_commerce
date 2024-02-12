import express from "express";
import {
  checkAdmin,
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../db/index.js";
import { verifyToken } from "../middleware/middleware.js";

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

// POST /new - Create a new product
productRouter.post("/new", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    if (!(await checkAdmin(req.user.id))) return res.send("Unauthorized");
    const { name, description, image, count, price } = req.body;
    const product = await createProduct({
      name,
      description,
      image,
      count,
      price,
    });
    res.send({ product });
  } catch (error) {
    next(error);
  }
});

//PUT /update/:id - update a product
productRouter.put("/update/:id", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    if (!(await checkAdmin(req.user.id))) return res.send("Unauthorized");
    const { name, description, image, count, price } = req.body;
    const { id } = req.params;
    const product = await updateProduct({
      id: Number(id),
      name,
      description,
      image,
      count,
      price,
    });
    res.send({ product });
  } catch (error) {
    next(error);
  }
});

//DELETE /remove/:id - remove a product
productRouter.delete("/remove/:id", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    if (!(await checkAdmin(req.user.id))) return res.send("Unauthorized");
    const removeProduct = await deleteProduct(req.params.id);
    res.send({ removeProduct });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
