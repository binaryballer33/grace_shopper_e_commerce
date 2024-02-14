import express from "express";
import prisma, {
  checkoutOrder,
  updateCart,
  updateQuantity,
} from "../db/index.js";
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
//session storage will look like session:{cart:[{item1:{productid,quantity}},{item2:{productid,quantity}},{item3:{productid,quantity}}]}
//if session storage empty do nothing
//if user has an empty cart, create order and add items to cart
//if user has a cart without items, add items to cart
//if user has a cart with items, replace items in cart that already exist if quantity changed, otherwise add new items
cartRouter.put("/addCart", verifyToken, async (req, res, next) => {
  try {
    if (!req.user) return res.send("User not logged in");
    if (!req.body.cart.length) return res.send();
    //get the order of the user
    const order = await prisma.orders.findFirst({
      where: {
        userId: req.user.id,
        status: "inCart",
      },
    });
    let orderItems = null,
      total = 0;
    //if there is an order get all the items in the order
    if (order)
      orderItems = await prisma.productsInOrder.findMany({
        where: {
          orderId: order?.id,
        },
      });
    //no order create order
    else
      order = await prisma.orders.create({
        data: {
          userId: req.user.id,
          status: "inCart",
          total: 0,
        },
      });
    //if no items in order
    if (!orderItems) {
      //add items into productsInOrder table
      for (let items of req.body.cart) {
        await prisma.productsInOrder.create({
          data: {
            productId: items.productid,
            orderId: order.id,
            quantity: items.quantity,
          },
        });
        //get product info (price)
        const item = await prisma.products.findFirst({
          where: {
            id: items.productid,
          },
        });
        total += item.price;
      }
      //update order total
      order = await prisma.orders.update({
        where: {
          id: order.id,
          userId: req.user.id,
        },
        data: {
          total: order.total + items.quantity * item.price,
        },
      });
    }
    //if there are items in order
    res.send("done");
  } catch (error) {
    next(error);
  }
});

export default cartRouter;
