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
	const { userId, total, status, createdAt } = order;
	try {
		const order = await prisma.orders.create({
			data: {
				userId,
				total,
				status,
				createdAt,
			},
		});
		return order;
	} catch (error) {
		console.error("Error creating order: ", error);
	}
}

export async function createOrderDetail(orderDetail) {
	const { orderId, productId, quantity } = orderDetail;
	try {
		const orderDetail = await prisma.orderDetail.create({
			data: {
				orderId,
				productId,
				quantity,
			},
		});
		return orderDetail;
	} catch (error) {
		console.error("Error creating order detail: ", error);
	}
}

export default prisma;
