import express from "express";
import prisma, {
	checkoutOrder,
	updateCart,
	updateQuantity,
	initialAdd,
	getIncartOrder,
} from "../db/index.js";
import { verifyToken } from "../middleware/middleware.js";
const cartRouter = express.Router();

//GET /incart all incart orders of user
cartRouter.get("/incart", verifyToken, async (req, res, next) => {
	try {
		if (!req.user)
			return res
				.status(400)
				.send({
					message: "User not logged in",
					status: res.statusCode,
				});
		const inCart = await getIncartOrder(req.user.id);
		inCart.val === 1
			? res.status(200).send({
					message:
						"Successfully checked for incart order but none exists",
					order: { order: {}, orderDetailsWithDescriptions: [] },
			  })
			: inCart.val === 2
			? res.status(200).send({
					message:
						"Successfully checked for incart order but none exists",
					order: {
						order: inCart.order,
						orderDetailsWithDescriptions: [],
					},
			  })
			: res
					.status(200)
					.send({
						message: "Successfully found cart data",
						order: inCart,
					});
	} catch (error) {
		next(error);
	}
});

//PUT /checkout - checks out items in the cart
cartRouter.put("/checkout", verifyToken, async (req, res, next) => {
	try {
		if (!req.user)
			return res
				.status(400)
				.send({
					message: "User not logged in",
					status: res.statusCode,
				});
		const inCart = await checkoutOrder(req.user.id, "inCart");
		res.status(200).send({
			message: "Successfully checkout order",
			order: inCart,
		});
	} catch (error) {
		next(error);
	}
});

//PUT /cancel - cancel an inCart order
cartRouter.put("/cancel", verifyToken, async (req, res, next) => {
	try {
		if (!req.user)
			return res
				.status(400)
				.send({
					message: "User not logged in",
					status: res.statusCode,
				});
		const cancelled = await checkoutOrder(req.user.id, "cancelled");
		res.status(200).send({
			message: "Successfully cancelled order",
			order: cancelled,
		});
	} catch (error) {
		next(error);
	}
});

//PUT /update - add item into cart inital quanity as 1
cartRouter.put("/add", verifyToken, async (req, res, next) => {
	try {
		if (!req.user)
			return res
				.status(400)
				.send({
					message: "User not logged in",
					status: res.statusCode,
				});
		const update = await updateCart(req.user.id, req.body.productid, true);
		res.status(200).send({
			message: "Successfully added item to cart",
			order: update,
		});
	} catch (error) {
		next(error);
	}
});

//PUT /delete - remove item from cart
cartRouter.put("/delete", verifyToken, async (req, res, next) => {
	try {
		if (!req.user)
			return res
				.status(400)
				.send({
					message: "User not logged in",
					status: res.statusCode,
				});
		const update = await updateCart(req.user.id, req.body.productid, false);
		res.status(201).send({
			message: "Successfully removed item from cart",
			order: update,
		});
	} catch (error) {
		next(error);
	}
});

//addquantity
cartRouter.put("/updateUp", verifyToken, async (req, res, next) => {
	try {
		if (!req.user)
			return res
				.status(400)
				.send({
					message: "User not logged in",
					status: res.statusCode,
				});
		const update = await updateQuantity(
			req.user.id,
			req.body.productid,
			true
		);
		res.status(201).send({
			message: "Successfully increased quantity by 1",
			order: update,
		});
	} catch (error) {
		next(error);
	}
});

//deletequanity
cartRouter.put("/updateDown", verifyToken, async (req, res, next) => {
	try {
		if (!req.user)
			return res
				.status(400)
				.send({
					message: "User not logged in",
					status: res.statusCode,
				});
		const update = await updateQuantity(
			req.user.id,
			req.body.productid,
			false
		);
		res.status(201).send({
			message: "Successfully decreased quantity by 1",
			order: update,
		});
	} catch (error) {
		next(error);
	}
});

//POST /addCart - if user is not logged in, the cart is saved in session storage, once logged in add session cart to db, call this when user logs in
//session storage will look like session:{cart:[{productid,quantity},{productid,quantity},{productid,quantity}]}
//if session storage empty do nothing
//if user has an empty cart, create order and add items to cart
//if user has a cart without items, add items to cart
//if user has a cart with items, replace items and add new items
cartRouter.put("/addCart", verifyToken, async (req, res, next) => {
	try {
		return !req.user
			? res
					.status(400)
					.send({
						message: "User not logged in",
						status: res.statusCode,
					})
			: !req.body.cart.length
			? res.status(200).send({ message: "Empty cart" })
			: res.status(201).send({
					message: "Successfully updated cart",
					order: await initialAdd(req.user.id, req.body.cart),
			  });
	} catch (error) {
		next(error);
	}
});

export default cartRouter;
