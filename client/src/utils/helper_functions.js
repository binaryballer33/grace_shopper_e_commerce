// capitalize the first letter of each word
export const capitalize = (str) => {
	return str.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	);
};

export const transformTextField = (textfield) =>
	textfield.toLowerCase().replace(" ", "");

export const getOrderTotal = (order) => {
	return order.reduce((acc, item) => {
		return acc + item.itemDescription.price * item.quantity;
	}, 0);
};
