import express from "express";
import { checkoutOrder } from "../db/index.js";
import { verifyToken } from "../middleware/middleware.js";
const cartRouter = express.Router();

//PUT /checkout - checks out items in the cart
cartRouter.put("/checkout", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    const inCart = await checkoutOrder(req.user.id, "inCart");
    res.send(inCart);
  } catch (error) {
    next(error);
  }
});

//PUT /cancel - cancel an inCart order
cartRouter.put("/cancel", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    const cancelled = await checkoutOrder(req.user.id, "cancelled");
    res.send(cancelled);
  } catch (error) {
    next(error);
  }
});

export default cartRouter;
