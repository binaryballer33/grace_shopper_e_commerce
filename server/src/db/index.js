import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllUsers() {
	try {
		const users = await prisma.users.findMany();
		return users;
	} catch (error) {
		console.error("Error getting all users: ", error);
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
