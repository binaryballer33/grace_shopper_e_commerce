/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
	Button,
	ButtonGroup,
	Card,
	CardMedia,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import {
	useGetCartQuery,
	useDecreaseProductQuantityMutation,
	useIncreaseProductQuantityMutation,
	useRemoveProductFromCartMutation,
	useCancelOrderMutation,
	useCheckoutOrderMutation,
} from "../../../api/orderApi";
import { Loading, ProductItem } from "../../../components";
import { getOrderTotal } from "../../../utils/helper_functions";
import { Link } from "react-router-dom";
import axios from "axios";
import {
	BACKEND_BASE_URL,
	USER_CREDENTIALS,
	getPurchaseConfirmationEmailRoute,
} from "../../../utils/constant";

const CartFailure = () => {
	return (
		<Typography variant="h4" color="primary.main">
			No items in cart
		</Typography>
	);
};

const LoggedOutUserCart = ({
	increaseProductQuantity,
	decreaseProductQuantity,
	removeProductFromCart,
}) => {
	// try to get cart from session storage
	const sessionStorage = window.sessionStorage.getItem("cart");

	// if cart exist in session storage, get the cart, else set cart to an empty array
	const cart =
		Object.values(sessionStorage ? JSON.parse(sessionStorage) : {}) || [];

	// get the cart total
	const getCartTotal = (cart) => {
		return cart.reduce((acc, product) => {
			return acc + product.price * product.quantity;
		}, 0);
	};

	return (
		<Stack sx={{ alignItems: "center", gap: 4 }}>
			{/* Order Total */}
			<Typography variant="h4" sx={{ mt: 4, color: "primary.main" }}>
				Order Total: ${getCartTotal(cart)}.00
			</Typography>

			{/* Products In The Cart  */}
			<Grid
				container
				gap={2}
				justifyContent="center"
				textAlign="center"
				mt={4}
			>
				{window.sessionStorage.cart &&
					cart.map((product) => {
						return (
							<Grid item key={product.id}>
								<Card>
									<CardMedia
										image={product.image}
										alt={product.name}
										sx={{
											height: 320,
											objectFit: "fill", // makes the image fit perfectly into the card
											transition: "opacity 0.3s ease",
											"&:hover": {
												opacity: 0.2,
											},
											width: { xs: 300, sm: 320 },
											mb: 2,
										}}
										component="img"
									/>{" "}
									<Typography variant="h4">
										{product.name}
									</Typography>
									<Stack
										flexDirection="row"
										justifyContent="space-around"
									>
										<Typography
											variant="body2"
											fontWeight="bold"
										>
											Price: ${product.price}
										</Typography>
										<Typography
											variant="body2"
											fontWeight="bold"
										>
											Quantity: {product.quantity}
										</Typography>
									</Stack>
									<ButtonGroup
										sx={{
											width: { xs: 300, sm: 320 },
											mt: 2,
										}}
									>
										<Button
											variant="contained"
											color="primary"
											id={product.id}
											onClick={() =>
												removeProductFromCart(
													product.id
												)
											}
											sx={{ flexGrow: 1 }}
										>
											Remove
										</Button>
										<Button
											variant="contained"
											color="primary"
											id={product.id}
											onClick={() =>
												increaseProductQuantity(
													product.id
												)
											}
										>
											Increase
										</Button>
										<Button
											variant="contained"
											color="primary"
											id={product.id}
											onClick={() =>
												decreaseProductQuantity(
													product.id
												)
											}
										>
											Decrease
										</Button>
									</ButtonGroup>
								</Card>
							</Grid>
						);
					})}
			</Grid>

			{/* Link To Login Page */}
			<Button variant="contained" component={Link} to="/login">
				<Typography variant="h5">Login To Check Out</Typography>
			</Button>
		</Stack>
	);
};

const LoggedInUserCart = ({
	removeProductFromCart,
	cancelOrder,
	// checkoutOrder,
}) => {
	const { data, isLoading, refetch } = useGetCartQuery();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [checkoutOrder] = useCheckoutOrderMutation();

	// get product order information
	const productsInOrder = data?.order?.orderDetailsWithDescriptions;
	const order = data?.order.order;

	// go through the checkout process
	const handleCheckout = async () => {
		const response = await checkoutOrder(); // send the order to the server
		window.location.href = response.data.checkoutUrl; // navigate to the checkout page

		// send purchase confirmation email
		const { user } = JSON.parse(
			window.sessionStorage.getItem(USER_CREDENTIALS)
		);

		// TODO: convert this into redux toolkit query later also make it work only after payment has been made
		await axios.post(
			`${BACKEND_BASE_URL}${getPurchaseConfirmationEmailRoute()}`,
			{
				from: "shaqmandy@resend.dev",
				to: user.username,
				subject: "Thank You For Your Purchase 🙂",
				// create the email body, it takes a string of html
				html: productsInOrder
					.map((order) => {
						return `<p>${order.quantity}X ${order.itemDescription.name}</p>`;
					})
					.join(""), // make the array into a string
			}
		);
	};

	return (
		<Stack
			sx={{
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				minHeight: "100dvh",
				minWidth: "100dvw",
			}}
		>
			{isLoading ? (
				<Loading />
			) : !productsInOrder ? (
				<CartFailure />
			) : (
				<Stack
					sx={{
						alignItems: "center",
						justifyContent: "space-evenly",
						textAlign: "center",
						minHeight: "100dvh",
						minWidth: "100dvw",
					}}
				>
					{/* Cart Header */}
					<Typography
						variant={isSmallScreen ? "h4" : "h3"}
						color="primary.main"
						sx={{ mt: { xs: 4, sm: 2 }, mb: { xs: 4, md: 2 } }}
					>
						Cart Order ID: {order.id}
					</Typography>

					{/* Cart Items */}
					<Grid container gap={2} justifyContent="center">
						{productsInOrder.map((order) => {
							return (
								<Stack key={order.productId}>
									<ProductItem
										key={order.id}
										product={order.itemDescription}
										quantity={order.quantity}
										sx={{
											p: { xs: 0.5, sm: 1 },
											bgcolor: "primary.main",
											width: {
												xs: 300,
												sm: 320,
											},
										}}
									/>

									{/* Card Action Buttons */}
									<ButtonGroup sx={{ mt: "2px" }}>
										<Button
											variant="contained"
											onClick={() => {
												removeProductFromCart(
													order.productId
												);
												refetch();
											}}
											sx={{ flexGrow: 1 }}
										>
											Delete
										</Button>
									</ButtonGroup>
								</Stack>
							);
						})}
					</Grid>

					{/* Cart Actions */}
					<Stack
						sx={{
							flexDirection: { xs: "column", sm: "row" },
							mt: 2,
							mb: 2,
							gap: 2,
						}}
					>
						<Button variant="contained" onClick={cancelOrder}>
							Cancel Order
						</Button>
						<Button variant="contained" onClick={handleCheckout}>
							Checkout
						</Button>
						<Typography variant="h4">
							Total: ${getOrderTotal(productsInOrder)}.00
						</Typography>
					</Stack>
				</Stack>
			)}
		</Stack>
	);
};

const Cart = () => {
	const [cart, setCart] = useState([]);
	const { token } = useSelector((state) => state.user);
	const [increaseProductQuantity] = useIncreaseProductQuantityMutation();
	const [decreaseProductQuantity] = useDecreaseProductQuantityMutation();
	const [removeProductFromCart] = useRemoveProductFromCartMutation();
	const [cancelOrder] = useCancelOrderMutation();

	useEffect(() => {
		const updateCart = () => {
			setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
		};
		if (window.sessionStorage.cart) updateCart();
	}, []);

	const handleProductIncrease = async (productId) => {
		if (token) {
			await increaseProductQuantity(Number(productId));
		} else {
			const cart = JSON.parse(window.sessionStorage.cart);
			cart[productId].quantity++;
			window.sessionStorage.setItem("cart", JSON.stringify(cart));
			setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
		}
	};

	const handleProductDecrease = async (productId) => {
		if (token) {
			await decreaseProductQuantity(Number(productId));
		} else {
			const cart = JSON.parse(window.sessionStorage.cart);
			cart[productId].quantity--;
			window.sessionStorage.setItem("cart", JSON.stringify(cart));
			setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
		}
	};

	const handleProductRemoval = async (productId) => {
		if (token) {
			await removeProductFromCart(Number(productId));
		} else {
			const cart = JSON.parse(window.sessionStorage.cart);
			delete cart[productId];
			window.sessionStorage.setItem("cart", JSON.stringify(cart));
			setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
		}
	};

	const handleCancelOrder = async () => {
		if (token) {
			await cancelOrder();
		} else {
			window.sessionStorage.removeItem("cart");
			setCart([]);
		}
	};

	// if user is logged in show LoggedInUserCart, else show LoggedOutUserCart
	return token ? (
		<LoggedInUserCart
			removeProductFromCart={handleProductRemoval}
			cancelOrder={handleCancelOrder}
		/>
	) : (
		<LoggedOutUserCart
			increaseProductQuantity={handleProductIncrease}
			decreaseProductQuantity={handleProductDecrease}
			removeProductFromCart={handleProductRemoval}
		/>
	);
};

export default Cart;
