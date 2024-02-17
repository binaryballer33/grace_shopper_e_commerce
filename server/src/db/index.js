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

export async function updateProduct(product) {
  const { id, name, description, image, count, price } = product;
  try {
    const product = await prisma.products.update({
      where: {
        id,
      },
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

export async function deleteProduct(id) {
  try {
    const removeProduct = await prisma.products.delete({
      where: {
        id: Number(id),
      },
    });
    return removeProduct;
  } catch (error) {
    console.error(error);
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

export const getIncartOrder = async (id) => {
  const order = await prisma.orders.findFirst({
    where: {
      userId: id,
      status: "inCart",
    },
  });
  if (!order) return { val: 1 };
  //get all the order items of the orders
  const orderDetails = await prisma.productsInOrder.findMany({
    where: { orderId: order.id },
  });
  if (!orderDetails.length) return { val: 2, order };
  const orderDetailsWithDescriptions = [];
  //get the items description
  for (let orderDetail of orderDetails) {
    orderDetailsWithDescriptions.push({
      ...orderDetail,
      itemDescription: await prisma.products.findFirst({
        where: { id: orderDetail.productId },
      }),
    });
  }
  return { order, orderDetailsWithDescriptions };
};

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

//will call this to either cancel an order or fulfill an order
export const checkoutOrder = async (id, type) => {
  try {
    //get incart status for the user
    const inCart = await prisma.orders.findFirst({
      where: {
        userId: id,
        status: "inCart",
      },
    });
    //get all the products in the cart
    const inCartItems = await prisma.productsInOrder.findMany({
      where: {
        orderId: inCart.id,
      },
    });
    // get all the product info in the cart
    const inCartItemsWithDescription = [];
    for (let item of inCartItems) {
      inCartItemsWithDescription.push({
        ...item,
        itemInfo: await prisma.products.findFirst({
          where: {
            id: item.productId,
          },
        }),
      });
    }
    //update order to be fulfilled
    await prisma.orders.update({
      where: {
        id: inCart.id,
      },
      data: {
        status: type === "inCart" ? "fulfilled" : "cancelled",
      },
    });
    return {
      order: {
        ...inCart,
        status: type === "inCart" ? "fulfilled" : "cancelled",
      },
      items: inCartItemsWithDescription,
    };
  } catch (error) {
    console.error(error);
  }
};

//allows user to add to cart
export const updateCart = async (userId, productId, isAdd) => {
  try {
    //gets the current cart
    let incart = await prisma.orders.findFirst({
      where: { userId, status: "inCart" },
    });
    //if there is no cart create an order with status of inCart
    if (!incart)
      incart = await prisma.orders.create({
        data: {
          userId,
          status: "inCart",
          total: 0,
        },
      });
    //add/remove products to/from cart
    let orderProduct;
    if (isAdd)
      await prisma.productsInOrder.create({
        data: {
          orderId: incart.id,
          productId,
          quantity: 1,
        },
      });
    else
      orderProduct = await prisma.productsInOrder.delete({
        where: {
          orderId_productId: {
            orderId: incart.id,
            productId,
          },
        },
      });
    //get the product details
    const product = await prisma.products.findFirst({
      where: {
        id: productId,
      },
    });
    //update cart total
    incart = await prisma.orders.update({
      where: {
        id: incart.id,
      },
      data: {
        total: isAdd
          ? incart.total + product.price
          : incart.total - product.price * orderProduct.quantity,
      },
    });
    //gets the new cart info
    //get all the products in the cart
    const inCartItems = await prisma.productsInOrder.findMany({
      where: {
        orderId: incart.id,
      },
    });
    // get all the product info in the cart
    const inCartItemsWithDescription = [];
    for (let item of inCartItems) {
      inCartItemsWithDescription.push({
        ...item,
        itemInfo: await prisma.products.findFirst({
          where: {
            id: item.productId,
          },
        }),
      });
    }
    return { order: incart, items: inCartItemsWithDescription };
  } catch (error) {
    console.error(error);
  }
};

//updates quantity
export const updateQuantity = async (userId, productId, isIncrease) => {
  try {
    let counter = true;
    //get cart info
    let order = await prisma.orders.findFirst({
      where: {
        userId,
        status: "inCart",
      },
    });
    //update productsInOrder by 1
    let orderItem = await prisma.productsInOrder.findFirst({
      where: {
        orderId: order.id,
        productId,
      },
    });
    //if deleting when quanitity is 1
    if (orderItem.quantity === 1 && !isIncrease) {
      orderItem = await prisma.productsInOrder.delete({
        where: {
          orderId_productId: { orderId: order.id, productId },
        },
      });
      counter = false;
    } else
      orderItem = await prisma.productsInOrder.update({
        where: {
          orderId_productId: { orderId: order.id, productId },
        },
        data: {
          quantity: isIncrease ? ++orderItem.quantity : --orderItem.quantity,
        },
      });
    //get item price
    const item = await prisma.products.findFirst({
      where: {
        id: productId,
      },
    });
    //update order total
    order = await prisma.orders.update({
      where: {
        id: order.id,
        userId,
      },
      data: {
        total: isIncrease ? order.total + item.price : order.total - item.price,
      },
    });
    //send back only order, and new item quantity to reduce db calls, redux store should be able to use this data to just update order total and item quantity
    return (
      (counter && { order, orderItem }) || {
        order,
        orderItem: { ...orderItem, quantity: 0 },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const initialAdd = async (id, cart) => {
  try {
    //find the order (inCart) of the user
    let order = await prisma.orders.findFirst({
      where: {
        userId: id,
        status: "inCart",
      },
    });
    //items in cart
    let orderItems = [],
      total = 0;
    //if there is an order, get all items of order and save in orderItems[], else create an order
    order
      ? (orderItems = await prisma.productsInOrder.findMany({
          where: {
            orderId: order?.id,
          },
        }))
      : (order = await prisma.orders.create({
          data: {
            userId: id,
            status: "inCart",
            total,
          },
        }));
    //if no items in cart, add items to order
    if (!orderItems.length) {
      for (let item of cart) {
        await prisma.productsInOrder.create({
          data: {
            productId: item.productid,
            orderId: order.id,
            quantity: item.quantity,
          },
        });
        //get price of item
        const product = await prisma.products.findFirst({
          where: {
            id: item.productid,
          },
        });
        //add to total
        total += product.price * item.quantity;
      }
    }
    //if there are items in cart, update existing items otherwise create new item
    else {
      //store existing items in obj
      const items = {};
      for (let item of orderItems) items[item.productId] = item.quantity;
      //for each item in cart, check if either we update of add
      for (let item of cart) {
        !items[item.productid]
          ? await prisma.productsInOrder.create({
              data: {
                orderId: order.id,
                productId: item.productid,
                quantity: item.quantity,
              },
            })
          : await prisma.productsInOrder.update({
              where: {
                orderId_productId: {
                  orderId: order.id,
                  productId: item.productid,
                },
              },
              data: {
                quantity: item.quantity,
              },
            });
        //update total
        const product = await prisma.products.findFirst({
          where: {
            id: item.productid,
          },
        });
        total += product.price * item.quantity;
      }
    }
    //update order total
    order = await prisma.orders.update({
      where: {
        id: order.id,
      },
      data: {
        total,
      },
    });
    return await getIncartOrder(id);
  } catch (error) {
    console.error(error);
  }
};

// check admin role
export const checkAdmin = async (id) => {
  try {
    const admin = await prisma.users.findFirst({
      where: {
        id,
      },
    });
    return admin.type === "admin";
  } catch (error) {
    console.error(error);
  }
};

export default prisma;
