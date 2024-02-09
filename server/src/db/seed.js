import bcrypt from "bcrypt";
import {
	PRODUCT_DATA,
	USER_DATA,
	ORDER_DATA,
	ORDER_DETAIL_DATA,
} from "./constants.js";
import prisma, {
	createProduct,
	createUser,
	createOrder,
	createOrderDetail,
} from "./index.js";

async function dropTables() {
	try {
		console.log("Attempting to drop tables...");

		// have to make sure to drop tables in correct order to avoid foreign key constraints
		await prisma.orderDetail.deleteMany();
		await prisma.orders.deleteMany();
		await prisma.products.deleteMany();
		await prisma.users.deleteMany();

		// need to do this in order to stop the sequence from continuing to increment
		// and causing a primary key violation when we try to insert/update/delete records from the tables
		await prisma.$executeRaw`ALTER SEQUENCE "orders_id_seq" RESTART WITH 1`;
		await prisma.$executeRaw`ALTER SEQUENCE "products_id_seq" RESTART WITH 1`;
		await prisma.$executeRaw`ALTER SEQUENCE "users_id_seq" RESTART WITH 1`;

		console.log("Finished dropping tables!");
	} catch (error) {
		console.error("Error dropping tables!");
		throw error;
	}
}

async function createInitialProducts() {
	try {
		console.log("Attempting to create initial products...");

		const products = await Promise.all(
			PRODUCT_DATA.map((product) => createProduct(product))
		);

		console.log("Finished creating products!");
		console.log("Products: ", products);
	} catch (error) {
		console.log("Error creating products!");
		throw error;
	}
}

async function createInitialUsers() {
	try {
		console.log("Attempting To Create Initial Users...");
		const hashedPassword = await bcrypt.hash("password", 10);

		// create 5 users
		const users = await Promise.all(
			USER_DATA.map((user) =>
				createUser({
					firstname: user.firstname,
					lastname: user.lastname,
					username: user.username,
					password: hashedPassword,
					type: user.type,
				})
			)
		);

		console.log("Finished creating users!");
		console.log("Users: ", users);
	} catch (error) {
		console.error("Error creating users!");
		throw error;
	}
}

async function createInitialOrders() {
	try {
		console.log("Attempting to create initial orders...");

		const orders = await Promise.all(
			ORDER_DATA.map((order) => createOrder(order))
		);

		console.log("Finished creating order!");
		console.log("Orders: ", orders);
	} catch (error) {
		console.log("Error creating order!");
		throw error;
	}
}

async function createInitialOrderDetails() {
	try {
		console.log("Attempting to create initial order details...");

		const orderDetails = await Promise.all(
			ORDER_DETAIL_DATA.map((orderDetail) =>
				createOrderDetail(orderDetail)
			)
		);

		console.log("Finished creating order details!");
		console.log("Order Details: ", orderDetails);
	} catch (error) {
		console.log("Error creating order details!");
		throw error;
	}
}

async function rebuildDB() {
	try {
		await dropTables();
		await createInitialProducts();
		await createInitialUsers();
		await createInitialOrders();
		await createInitialOrderDetails();
	} catch (error) {
		console.log("Error during rebuildDB");
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

rebuildDB();
