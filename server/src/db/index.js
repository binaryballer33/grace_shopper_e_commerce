import { PrismaClient } from "@prisma/client";

// instantiate the prisma client once, use it all over the app
export const prisma = new PrismaClient();

export async function getAllUsers() {
	try {
		const users = await prisma.users.findMany();
		return users;
	} catch (error) {
		console.error("Error getting all users: ", error);
	}
}

/*
 * Product API Functions
 */

export async function getAllProducts() {
	try {
		const products = await prisma.products.findMany();
		return products;
	} catch (error) {
		console.error("Error getting all products: ", error);
	}
}

export async function getProduct(id) {
	try {
		const product = await prisma.products.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		return product;
	} catch (error) {
		console.error(`Error getting product ${id}: `, error);
	}
}

export async function createProduct(product) {
	const { name, description, image, count, price } = product;
	try {
		const product = await prisma.products.create({
			data: {
				name,
				description,
				image,
				count,
				price,
			},
		});
		return product;
	} catch (error) {
		console.error("Error creating product: ", error);
	}
}

/*
 * Users API Functions
 */

export async function createUser(user) {
	const { firstname, lastname, username, password, type } = user;
	try {
		const user = await prisma.users.create({
			data: {
				firstname,
				lastname,
				username,
				password,
				type,
			},
		});
		return user;
	} catch (error) {
		console.error("Error creating user: ", error);
	}
}

/*
 * Order API Functions
 */

export async function createOrder(order) {
	const { userId, total, status } = order;
	try {
		const order = await prisma.orders.create({
			data: {
				userId,
				total,
				status,
			},
		});
		return order;
	} catch (error) {
		console.error("Error creating order: ", error);
	}
}

/*
 * Products In Order API Functions
 */

export async function createProductInOrder(productInOrder) {
	const { orderId, productId, quantity } = productInOrder;
	try {
		const productOrder = await prisma.productsInOrder.create({
			data: {
				orderId,
				productId,
				quantity,
			},
		});
		return productOrder;
	} catch (error) {
		console.error("Error creating product in order: ", error);
	}
}

export default prisma;
