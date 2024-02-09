/*
 * gives random number inclusive of both numbers
 */
function randomNumberBetweeen(number1, number2) {
	number1 = Math.ceil(number1);
	number2 = Math.floor(number2);
	return Math.floor(Math.random() * (number2 - number1 + 1) + number1);
}

const IMG_URL =
	"https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg";

// array of 45 products
export const PRODUCT_DATA = [
	// id's are auto generated
	{
		name: "Apple",
		description: "Apples are crisp and sweet with a variety of colors.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Banana",
		description:
			"Bananas are a versatile, yellow fruit with a mild flavor.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Orange",
		description:
			"Oranges are citrus fruits known for their juicy, tangy taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Grapes",
		description:
			"Grapes come in clusters and can be red, green, or purple.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Strawberry",
		description: "Strawberries are small, red, and sweet berries.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Watermelon",
		description:
			"Watermelons are large, refreshing fruits with sweet, pink flesh.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Mango",
		description:
			"Mangoes are tropical fruits with a sweet and juicy taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Pineapple",
		description:
			"Pineapples have a spiky exterior and sweet, tropical flavor.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Peach",
		description: "Peaches are fuzzy fruits with juicy, fragrant flesh.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Kiwi",
		description: "Kiwis are small, brown fruits with vibrant green flesh.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Blueberry",
		description:
			"Blueberries are small, round berries known for their antioxidants.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Pear",
		description: "Pears are sweet and come in various shapes and colors.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cherry",
		description:
			"Cherries are small, red or purple fruits with a sweet and tart taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Plum",
		description:
			"Plums are smooth-skinned fruits with sweet and juicy flesh.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Raspberry",
		description:
			"Raspberries are small, red berries with a slightly tart flavor.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cantaloupe",
		description: "Cantaloupes have orange, juicy flesh and a sweet aroma.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Apricot",
		description:
			"Apricots are small, golden fruits with a sweet and velvety texture.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Pomegranate",
		description:
			"Pomegranates have a tough outer rind and juicy, ruby-red seeds.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Coconut",
		description:
			"Coconuts have a hard outer shell and sweet, coconut water inside.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Lemon",
		description:
			"Lemons are sour citrus fruits commonly used for their juice.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Lime",
		description:
			"Limes are green, tangy fruits often used in cooking and drinks.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Avocado",
		description: "Avocados have a creamy texture and a mild, nutty taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Papaya",
		description: "Papayas have orange, tropical flesh with a sweet flavor.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Grapefruit",
		description:
			"Grapefruits are large citrus fruits with a tangy and slightly bitter taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Nectarine",
		description:
			"Nectarines are smooth-skinned fruits similar to peaches but without fuzz.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Blackberry",
		description:
			"Blackberries are dark purple berries with a sweet and tart flavor.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Rambutan",
		description:
			"Rambutans are hairy fruits with sweet, translucent flesh.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Dragon Fruit",
		description:
			"Dragon Fruit, or pitaya, has a vibrant pink skin and mildly sweet taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Passion Fruit",
		description:
			"Passion Fruit has a tough outer rind and aromatic, juicy seeds.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Guava",
		description:
			"Guavas are tropical fruits with a fragrant aroma and sweet taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Fig",
		description:
			"Figs are unique fruits with a chewy texture and sweet flavor.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Lychee",
		description:
			"Lychees are small, red fruits with translucent, juicy flesh.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Persimmon",
		description:
			"Persimmons are orange fruits with a sweet and honey-like taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cranberry",
		description:
			"Cranberries are small, red berries often used in sauces and juices.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Mandarin Orange",
		description:
			"Mandarin Oranges are small, citrus fruits with a sweet flavor.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Tangerine",
		description:
			"Tangerines are similar to mandarins, known for their easy-to-peel skin.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Kumquat",
		description: "Kumquats are tiny citrus fruits that can be eaten whole.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Date",
		description: "Dates are sweet, brown fruits with a chewy texture.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Star Fruit",
		description:
			"Star Fruit, or carambola, has a unique star-shaped cross-section.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Honeydew Melon",
		description:
			"Honeydew Melons have pale green flesh and a sweet, mild flavor.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Jackfruit",
		description:
			"Jackfruits are large fruits with yellow, fibrous flesh and a sweet taste.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Clementine",
		description: "Clementines are small, easy-to-peel citrus fruits.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cucumber",
		description:
			"Cucumbers, although commonly considered vegetables, are technically fruits.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cherimoya",
		description:
			"Cherimoyas have a green, scaly skin and sweet, custard-like flesh.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Melon",
		description:
			"Melons refer to various large, juicy fruits like watermelon and cantaloupe.",
		image: IMG_URL,
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
];

// array of 5 users
export const USER_DATA = [
	// id's are auto generated
	{
		firstname: "Admin",
		lastname: "User",
		username: "admin123",
		password: "",
		type: "admin",
	},
	{
		firstname: "Mack",
		lastname: "A",
		username: "mack123",
		password: "",
		type: "customer",
	},
	{
		firstname: "Andrew",
		lastname: "L",
		username: "andrew123",
		password: "",
		type: "customer",
	},
	{
		firstname: "Shaq",
		lastname: "M",
		username: "shaq123",
		password: "",
		type: "customer",
	},
	{
		firstname: "Fullstack",
		lastname: "Academy",
		username: "fullstack123",
		password: "",
		type: "customer",
	},
];

// array of 15 random orders
export const ORDER_DATA = Array.from({ length: 15 }, () => ({
	// id's are auto generated
	userId: randomNumberBetweeen(1, USER_DATA.length),
	total: randomNumberBetweeen(1, 100),
	status:
		Math.random() > 0.55
			? "fulfilled"
			: Math.random() > 0.33
			? "inCart"
			: "cancelled",
	// don't need to create the date, it is auto generated
}));

// array of 15 random order details
export const PRODUCTS_IN_ORDER = [
	{
		orderId: 1,
		productId: 1,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 1,
		productId: 5,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 1,
		productId: 10,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 2,
		productId: 32,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 2,
		productId: 45,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 2,
		productId: 8,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 3,
		productId: 33,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 3,
		productId: 44,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 3,
		productId: 7,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 4,
		productId: 30,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 4,
		productId: 32,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 4,
		productId: 28,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 5,
		productId: 6,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 5,
		productId: 16,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 5,
		productId: 36,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 6,
		productId: 23,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 6,
		productId: 24,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 7,
		productId: 4,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 7,
		productId: 2,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 7,
		productId: 5,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 7,
		productId: 19,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 8,
		productId: 8,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 8,
		productId: 24,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 9,
		productId: 7,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 9,
		productId: 17,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 9,
		productId: 27,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 9,
		productId: 37,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 10,
		productId: 22,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 10,
		productId: 20,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 11,
		productId: 11,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 12,
		productId: 28,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 12,
		productId: 18,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 12,
		productId: 8,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 13,
		productId: 45,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 13,
		productId: 41,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 14,
		productId: 14,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 14,
		productId: 15,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 14,
		productId: 16,
		quantity: randomNumberBetweeen(1, 10),
	},
	{
		orderId: 15,
		productId: 40,
		quantity: randomNumberBetweeen(1, 10),
	},
];
