import { PrismaClient } from "@prisma/client";

// instantiate the prisma client once, use it all over the app
const prisma = new PrismaClient();

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

export const getOrders = async (id) => {
  //get all fulfilled/cancelled/incart orders of user
  const orders = await prisma.orders.findMany({
    where: { userId: id },
  });
  //get all the order items of the orders
  const orderDetails = [];
  for (let order of orders) {
    orderDetails.push({
      order,
      items: await prisma.productsInOrder.findMany({
        where: { orderId: order.id },
      }),
    });
  }
  const orderDetailsWithDescriptions = [];
  //get the items description
  for (let orderDetail of orderDetails) {
    const itemInfo = [];
    for (let item of orderDetail.items) {
      itemInfo.push({
        ...item,
        itemDescription: await prisma.products.findFirst({
          where: { id: item.productId },
        }),
      });
    }
    orderDetailsWithDescriptions.push({ ...orderDetail.order, itemInfo });
  }
  //clean up orders by breaking into 3 [] cancelled, fulfilled, and incart
  const cancelled = [],
    fulfilled = [],
    incart = [];
  orderDetailsWithDescriptions.forEach((order) => {
    order.status === "cancelled"
      ? cancelled.push(order)
      : order.status === "fulfilled"
      ? fulfilled.push(order)
      : incart.push(order);
  });
  return { cancelled, fulfilled, incart };
};

export default prisma;
