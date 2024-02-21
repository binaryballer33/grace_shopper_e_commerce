/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
	Box,
	Card,
	CardMedia,
	Grid,
	Typography,
	Button,
	Stack,
	Tooltip,
	IconButton,
	useMediaQuery,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import { capitalize } from "../../../../utils/helper_functions";
import {
	useAddProductToCartMutation,
	useDecreaseProductQuantityMutation,
	useGetCartQuery,
} from "../../../../api/orderApi";

const ProductItem = ({ product, quantity, ...props }) => {
	const { token } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const location = useLocation();
	const isProductPage = location.pathname.includes("/product/");
	const { data, isLoading, refetch } = useGetCartQuery();

	// text transformation
	let productDescription =
		!isProductPage && product.description.length > 60
			? product.description.slice(0, 60) + "..."
			: product.description;
	productDescription = capitalize(productDescription);
	let productName = capitalize(product.name);

	// add to cart handleClick
	const [addProductToCart] = useAddProductToCartMutation();
	const increaseProductQuantityHandler = async () => {
		if (token) {
			// if user is logged in add item to cart, validation to check if item in cart not made
			const data = await addProductToCart(Number(product.id));
			refetch();
			console.log("Clicked The Add To Cart Button In Image: ", data);
			return data;
		} else {
			// if guest is adding to cart, add to session storage, this data will be sent once use logs in or registers
			if (window.sessionStorage.cart) {
				const cart = JSON.parse(window.sessionStorage.cart);
				if (cart[product.id]) {
					cart[product.id].quantity++;
				} else {
					cart[product.id] = {
						...product,
						quantity: 1,
					};
				}
				window.sessionStorage.setItem("cart", JSON.stringify(cart));
			} else {
				window.sessionStorage.setItem(
					"cart",
					JSON.stringify({
						[product.id]: {
							...product,
							quantity: 1,
						},
					})
				);
			}
		}
	};

	// decrease quantity in cart handleClick
	const [descreaseProductQuantity] = useDecreaseProductQuantityMutation();
	const decreaseProductQuantityHandler = async () => {
		if (token) {
			const data = await descreaseProductQuantity(Number(product.id));
			refetch();
			console.log(
				"Clicked The Decrease Quantity Cart Button In Image: ",
				data
			);

			// maybe do a refetch here
			return data;
		} else {
			// if cart does not exist do nothing
			if (!window.sessionStorage.cart) return;

			// if cart exist get the cart from session storage
			const cart = JSON.parse(window.sessionStorage.cart);

			// if item does not exist in cart do nothing
			if (!cart[product.id]) return;

			// if item exist and quantity is 1 remove the item
			if (cart[product.id].quantity === 1) {
				delete cart[product.id];
			} else {
				// else reduce quantity by 1
				--cart[product.id].quantity;
			}

			// update session
			window.sessionStorage.setItem("cart", JSON.stringify(cart));
		}
	};

	// navigate to the product page if the user is not already on the product page
	const navigateToProductPage = () => {
		isProductPage ? "" : navigate(`/product/${product.id}`);
	};

	return (
		<Grid item>
			{/* trick to make our components behave like MUI components and inherit their props */}
			<Box {...props} key={product.id}>
				{/* card with a image, some content and some actions like add to cart */}
				<Tooltip title={productName} placement="top">
					<Card
						elevation={10}
						sx={{
							height: isProductPage ? 600 : 500,
							position: "relative",
						}}
					>
						{/* card image */}
						<CardMedia
							image={product.image}
							alt={productName}
							sx={{
								height: 320,
								objectFit: "fill", // makes the image fit perfectly into the card
								transition: "opacity 0.3s ease",
								"&:hover": {
									opacity: 0.2,
								},
								"&:hover ~ button": {
									opacity: 1,
								},
							}}
							component="img"
						/>

						{/* add to cart button */}
						<IconButton
							onClick={increaseProductQuantityHandler}
							sx={{
								position: "absolute",
								top: "35%",
								right: "10%",
								transform: "translate(-50%, -50%)",
								opacity: 0, // Change opacity to make it visible
								transition: "opacity 0.3s ease",
								"&:hover": {
									opacity: 1,
								},
							}}
						>
							<Tooltip title="Checkout" placement="bottom">
								<AddShoppingCartIcon
									sx={{
										color: "primary.main",
										fontSize: 50,
									}}
								/>
							</Tooltip>
						</IconButton>

						{/* remove from cart button */}
						<IconButton
							sx={{
								position: "absolute",
								top: "35%",
								left: "25%",
								transform: "translate(-50%, -50%)",
								opacity: 0, // Change opacity to make it visible
								transition: "opacity 0.3s ease",
								"&:hover": {
									opacity: 1,
								},
							}}
							onClick={decreaseProductQuantityHandler}
						>
							<Tooltip
								title="Delete Reservation"
								placement="bottom"
							>
								<RemoveIcon
									sx={{
										color: "primary.main",
										fontSize: 50,
									}}
								/>
							</Tooltip>
						</IconButton>

						{/* text inside of the card */}
						<Stack
							sx={{
								p: 2,
								//  height of the text container after subtracting the padding
								height: isProductPage ? 248 : 148,
								justifyContent: "space-between",
							}}
						>
							{/* Styling for the button name */}
							<Box
								onClick={navigateToProductPage}
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Button
									variant="text"
									sx={{ color: "primary" }}
								>
									<Typography variant="h5" fontWeight="bold">
										{productName}
									</Typography>
								</Button>
							</Box>

							<Typography
								variant="body1"
								sx={{ textAlign: "center" }}
							>
								{productDescription}
							</Typography>

							{/* Card In Stock and Card Price */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									mt: 2,
								}}
							>
								<Typography variant="body1" fontWeight={550}>
									Price:{" "}
									<Typography
										component="span"
										fontWeight={550}
										sx={{ color: "primary.main" }}
									>
										${product.price}
									</Typography>
								</Typography>
								<Typography variant="body1" fontWeight={550}>
									{location.pathname.includes("/order") ||
									location.pathname.includes("/cart")
										? "Quantity: "
										: "In Stock: "}
									<Typography
										component="span"
										fontWeight={550}
										sx={{ color: "primary.dark" }}
									>
										{quantity || product.count}
									</Typography>
								</Typography>
							</Box>
						</Stack>
					</Card>
				</Tooltip>
			</Box>
		</Grid>
	);
};

export default ProductItem;
