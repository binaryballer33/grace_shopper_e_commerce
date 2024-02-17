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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import { capitalize } from "../../../../utils/helper_functions";
import { useAddMutation } from "../../../../api/orderApi";
import { useState } from "react";

const ProductItem = ({ product, quantity, ...props }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isProductPage = location.pathname.includes("/product/");
	const [hovered, setHovered] = useState(false); // State to track hover state

	// text transformation
	let productDescription =
		!isProductPage && product.description.length > 60
			? product.description.slice(0, 60) + "..."
			: product.description;
	productDescription = capitalize(productDescription);
	let productName = capitalize(product.name);

	// add to cart handleClick
	const [addItem] = useAddMutation();
	const { token } = useSelector((state) => state.user);
	const add = (e) => {
		e.preventDefault();
		//if user is logged in add item to cart, validation to check if item in cart not made
		if (token) addItem(Number(e.target.id));
		//if guest is adding to cart, add to session storage, this data will be sent once use logs in or registers
		else {
			if (window.sessionStorage.cart) {
				const data = JSON.parse(window.sessionStorage.cart);
				if (data[e.target.id]) data[e.target.id].quantity++;
				else
					data[e.target.id] = {
						quantity: 1,
						name: e.target.name,
						price: Number(e.target.title),
						id: Number(e.target.id),
						image: e.target.value,
					};
				window.sessionStorage.setItem("cart", JSON.stringify(data));
			} else {
				window.sessionStorage.setItem(
					"cart",
					JSON.stringify({
						[e.target.id]: {
							quantity: 1,
							name: e.target.name,
							price: Number(e.target.title),
							id: Number(e.target.id),
							image: e.target.value,
						},
					})
				);
			}
		}
	};

	// navigate to the product page if the user is not already on the product page
	const handleClick = () => {
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
								transition: "opacity 0.3s ease", // Add this line
								"&:hover": {
									opacity: 0.2,
								},
							}}
							component="img"
							onMouseEnter={() => setHovered(true)} // Set hovered to true on mouse enter
							onMouseLeave={() => setHovered(false)} // Set hovered to false on mouse leave
						/>

						{/* add to cart button */}
						{hovered && ( // Render IconButton when hovered is true
							<IconButton
								onClick={(event) => add(event)}
								sx={{
									position: "absolute",
									top: "35%",
									right: "10%",
									transform: "translate(-50%, -50%)",
									opacity: 1, // Change opacity to make it visible
									transition: "opacity 0.3s ease",
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
						)}

						{/* remove from cart button */}
						{hovered && (
							<IconButton
								sx={{
									position: "absolute",
									top: "35%",
									left: "25%",
									transform: "translate(-50%, -50%)",
									opacity: 1, // Change opacity to make it visible
									transition: "opacity 0.3s ease",
								}}
								onClick={() => {}}
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
						)}

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
								onClick={handleClick}
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
									{location.pathname.includes("/order")
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
