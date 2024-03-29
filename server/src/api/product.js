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

    if (!products)
      return res
        .status(500)
        .send({ message: "Failed To Get Products.", status: res.statusCode });

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
      return res.status(500).send({
        message: `Failed To Get Products ${id}: ${product.name}`,
        status: res.statusCode,
      });

    res.status(200).send({
      message: `Successfully Retrieved Product ${id}: ${product.name}`,
      product: product,
    });
  } catch (error) {
    next(error);
  }
});

// POST /create - Create a new product
productRouter.post("/create", verifyToken, async (req, res, next) => {
  try {
    if (!req.user)
      return res
        .status(400)
        .send({ message: "User not logged in", status: res.statusCode });
    if (!(await checkAdmin(req.user.id)))
      return res
        .status(400)
        .send({ message: "Unauthorized", status: res.statusCode });
    const { name, description, image, count, price } = req.body;
    const product = await createProduct({
      name,
      description,
      image,
      count,
      price,
    });
    res
      .status(201)
      .send({ message: "Successfully created a new product.", product });
  } catch (error) {
    next(error);
  }
});

//PUT /update/:id - update a product
productRouter.put("/update/:id", verifyToken, async (req, res, next) => {
  try {
    if (!req.user)
      return res
        .status(400)
        .send({ message: "User not logged in", status: res.statusCode });
    if (!(await checkAdmin(req.user.id)))
      return res
        .status(400)
        .send({ message: "Unauthorized", status: res.statusCode });
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
    res
      .status(200)
      .send({ message: "Successfully updated the product", product });
  } catch (error) {
    next(error);
  }
});

//DELETE /delete/:id - delete a product
//this does not handle removing the product for each user whose order contains the product, would prob be better to create a column for active and set to false
productRouter.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    if (!req.user)
      return res.status(400).send({
        message: "User not logged in",
        status: res.statusCode,
      });
    if (!(await checkAdmin(req.user.id)))
      return res
        .status(400)
        .send({ message: "Unauthorized", status: res.statusCode });
    const removeProduct = await deleteProduct(req.params.id);
    res
      .status(200)
      .send({ message: "Successfully removed product", removeProduct });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
