import express from "express";
import { checkoutOrder, updateCart, updateQuantity } from "../db/index.js";
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

//PUT /update - add item into cart inital quanity as 1
cartRouter.put("/add", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    const update = await updateCart(req.user.id, req.body.productid, true);
    res.send(update);
  } catch (error) {
    next(error);
  }
});

//PUT /delete - remove item from cart
cartRouter.put("/delete", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    const update = await updateCart(req.user.id, req.body.productid, false);
    res.send(update);
  } catch (error) {
    next(error);
  }
});

//addquantity
cartRouter.put("/updateUp", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    const update = await updateQuantity(req.user.id, req.body.productid, true);
    res.send(update);
  } catch (error) {
    next(error);
  }
});

//deletequanity
cartRouter.put("/updateDown", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    const update = await updateQuantity(req.user.id, req.body.productid, false);
    res.send(update);
  } catch (error) {
    next(error);
  }
});

//POST /addCart - if user is not logged in, the cart is saved in session storage, once logged in add session cart to db, call this when user logs in
//session storage will look like session:{cart:[{item1},{item2},{item3}]}
//if session storage empty do nothing
//if user has an empty cart, create order and add items to cart (updateCart())
//if user has a cart without items, add items to cart (updateCart())
//if user has a cart with items, replace items in cart that already exist if quantity changed, otherwise add new items
cartRouter.put("/addCart", verifyToken, async (req, res, next) => {
  if (!req.user) return res.send("User not logged in");
});

export default cartRouter;
