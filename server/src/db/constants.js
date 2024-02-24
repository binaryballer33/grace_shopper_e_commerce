/*
 * gives random number inclusive of both numbers
 */
function randomNumberBetweeen(number1, number2) {
	number1 = Math.ceil(number1);
	number2 = Math.floor(number2);
	return Math.floor(Math.random() * (number2 - number1 + 1) + number1);
}

export const FRONTEND_BASE_URL =
	process.env.NODE_ENV !== "production"
		? process.env.VITE_DEVELOPMENT_FRONTEND_BASE_URL
		: process.env.VITE_PRODUCTION_FRONTEND_BASE_URL;

const IMG_URL =
	"https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg";

// array of 45 products
export const PRODUCT_DATA = [
	// id's are auto generated
	{
		name: "Apple",
		description: "Apples are crisp and sweet with a variety of colors.",
		image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?width=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Banana",
		description:
			"Bananas are a versatile, yellow fruit with a mild flavor.",
		image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Orange",
		description:
			"Oranges are citrus fruits known for their juicy, tangy taste.",
		image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Grapes",
		description:
			"Grapes come in clusters and can be red, green, or purple.",
		image: "https://images.unsplash.com/photo-1597337726353-26512fbe80c6?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Strawberry",
		description: "Strawberries are small, red, and sweet berries.",
		image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Watermelon",
		description:
			"Watermelons are large, refreshing fruits with sweet, pink flesh.",
		image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Mango",
		description:
			"Mangoes are tropical fruits with a sweet and juicy taste.",
		image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Pineapple",
		description:
			"Pineapples have a spiky exterior and sweet, tropical flavor.",
		image: "https://images.unsplash.com/photo-1587883012610-e3df17d41270?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Peach",
		description: "Peaches are fuzzy fruits with juicy, fragrant flesh.",
		image: "https://images.unsplash.com/photo-1629828874514-c1e5103f2150?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Kiwi",
		description: "Kiwis are small, brown fruits with vibrant green flesh.",
		image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Blueberry",
		description:
			"Blueberries are small, round berries known for their antioxidants.",
		image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Pear",
		description: "Pears are sweet and come in various shapes and colors.",
		image: "https://images.unsplash.com/photo-1601876819102-99560f772713?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cherry",
		description:
			"Cherries are small, red or purple fruits with a sweet and tart taste.",
		image: "https://images.unsplash.com/photo-1528821099448-43ccebfbb899?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Plum",
		description:
			"Plums are smooth-skinned fruits with sweet and juicy flesh.",
		image: "https://images.unsplash.com/photo-1603408209093-cd3c9af497d6?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Raspberry",
		description:
			"Raspberries are small, red berries with a slightly tart flavor.",
		image: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cantaloupe",
		description: "Cantaloupes have orange, juicy flesh and a sweet aroma.",
		image: "https://media.istockphoto.com/id/155385577/photo/cantaloupe.webp?b=1&s=170667a&w=0&k=20&c=Ag35ZrC0eF4j_stQ17SQus4YBB6HD9UZAlPsTWJWR7o=",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Apricot",
		description:
			"Apricots are small, golden fruits with a sweet and velvety texture.",
		image: "https://images.unsplash.com/photo-1592681814168-6df0fa93161b?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Pomegranate",
		description:
			"Pomegranates have a tough outer rind and juicy, ruby-red seeds.",
		image: "https://plus.unsplash.com/premium_photo-1664114934710-5aa11f2c8dac?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Coconut",
		description:
			"Coconuts have a hard outer shell and sweet, coconut water inside.",
		image: "https://images.unsplash.com/photo-1560769680-ba2f3767c785?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Lemon",
		description:
			"Lemons are sour citrus fruits commonly used for their juice.",
		image: "https://images.unsplash.com/photo-1596181525841-8e8bae173eb0?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Lime",
		description:
			"Limes are green, tangy fruits often used in cooking and drinks.",
		image: "https://images.unsplash.com/photo-1622957461168-202e611c8077?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Avocado",
		description: "Avocados have a creamy texture and a mild, nutty taste.",
		image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Papaya",
		description: "Papayas have orange, tropical flesh with a sweet flavor.",
		image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Grapefruit",
		description:
			"Grapefruits are large citrus fruits with a tangy and slightly bitter taste.",
		image: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Nectarine",
		description:
			"Nectarines are smooth-skinned fruits similar to peaches but without fuzz.",
		image: "https://images.unsplash.com/photo-1597995463377-911fb3779867?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Blackberry",
		description:
			"Blackberries are dark purple berries with a sweet and tart flavor.",
		image: "https://images.unsplash.com/photo-1567870335471-1129836babcf?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Rambutan",
		description:
			"Rambutans are hairy fruits with sweet, translucent flesh.",
		image: "https://images.unsplash.com/photo-1609123079242-086695c6ff09?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Dragon Fruit",
		description:
			"Dragon Fruit, or pitaya, has a vibrant pink skin and mildly sweet taste.",
		image: "https://images.unsplash.com/photo-1517383898750-55acaa953838?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Passion Fruit",
		description:
			"Passion Fruit has a tough outer rind and aromatic, juicy seeds.",
		image: "https://images.unsplash.com/photo-1604495772376-9657f0035eb5?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Guava",
		description:
			"Guavas are tropical fruits with a fragrant aroma and sweet taste.",
		image: "https://img.imageboss.me/fourwinds/width/425/dpr:2/shop/files/Tropical-Pink-Guava-Tree.jpg?v=1696354088",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Fig",
		description:
			"Figs are unique fruits with a chewy texture and sweet flavor.",
		image: "https://images.unsplash.com/photo-1601379760591-1d89ae6ee1b7?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Lychee",
		description:
			"Lychees are small, red fruits with translucent, juicy flesh.",
		image: "https://images.unsplash.com/photo-1597975371270-cf80e4f54921?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Persimmon",
		description:
			"Persimmons are orange fruits with a sweet and honey-like taste.",
		image: "https://images.unsplash.com/photo-1604177594821-0e03aeedbd8b?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cranberry",
		description:
			"Cranberries are small, red berries often used in sauces and juices.",
		image: "https://images.unsplash.com/photo-1586811124870-46ade1cd8651?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Mandarin Orange",
		description:
			"Mandarin Oranges are small, citrus fruits with a sweet flavor.",
		image: "https://media.istockphoto.com/id/922611900/pt/foto/tangerine-or-mandarin-fruit-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=exh2hMt7uSUBG0M1l9xkEFjrR48RkncuMdmrOJZpVsw=",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Tangerine",
		description:
			"Tangerines are similar to mandarins, known for their easy-to-peel skin.",
		image: "https://images.unsplash.com/photo-1611329646571-689ddf8bfee9?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Kumquat",
		description: "Kumquats are tiny citrus fruits that can be eaten whole.",
		image: "https://images.unsplash.com/photo-1670843837142-8c4452916f8e?q=80&w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Date",
		description: "Dates are sweet, brown fruits with a chewy texture.",
		image: "https://images.unsplash.com/photo-1629738601425-494c3d6ba3e2?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Star Fruit",
		description:
			"Star Fruit, or carambola, has a unique star-shaped cross-section.",
		image: "https://images.unsplash.com/photo-1605879883262-0cd26b362f54?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Honeydew Melon",
		description:
			"Honeydew Melons have pale green flesh and a sweet, mild flavor.",
		image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Jackfruit",
		description:
			"Jackfruits are large fruits with yellow, fibrous flesh and a sweet taste.",
		image: "https://images.unsplash.com/photo-1620685581318-91ce6f1b76ca?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Clementine",
		description: "Clementines are small, easy-to-peel citrus fruits.",
		image: "https://images.unsplash.com/photo-1615634376658-c80abf877da2?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cucumber",
		description:
			"Cucumbers, although commonly considered vegetables, are technically fruits.",
		image: "https://images.unsplash.com/photo-1591340270341-00a786ffc0aa?w=320&h=320",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Cherimoya",
		description:
			"Cherimoyas have a green, scaly skin and sweet, custard-like flesh.",
		image: "https://media.istockphoto.com/id/1461025613/photo/pair-of-organic-atemoya-fruits-on-a-wicker-basket.webp?b=1&s=170667a&w=0&k=20&c=uEIUMEf9qeRLwX43Vc6qffAIeLuTi6byl6xLwe_vzok=",
		price: randomNumberBetweeen(1, 20),
		count: randomNumberBetweeen(1, 50),
	},
	{
		name: "Melon",
		description:
			"Melons refer to various large, juicy fruits like watermelon and cantaloupe.",
		image: "https://images.unsplash.com/photo-1602597190461-43774583d3c0?w=320&h=320",
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
	status: Math.random() > 0.75 ? "fulfilled" : "cancelled",
	// don't need to create the date, it is auto generated
})).concat([
	{ userId: 1, total: 0, status: "inCart" },
	{ userId: 2, total: 0, status: "inCart" },
	{ userId: 4, total: 0, status: "inCart" },
]);

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
