/* eslint-disable react/prop-types */
import {
	Box,
	Card,
	CardMedia,
	Grid,
	Typography,
	Button,
	Stack,
	Tooltip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { capitalize } from "../../../utils/helper_functions";

const ProductItem = ({ product, ...props }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isProductPage = location.pathname.includes("/product/");

	let productDescription =
		!isProductPage && product.description.length > 60
			? product.description.slice(0, 60) + "..."
			: product.description;
	productDescription = capitalize(productDescription);

	let productName = capitalize(product.name);

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
						}}
					>
						{/* card image */}
						<CardMedia
							image={product.image}
							alt={productName}
							sx={{
								height: 320,
								objectFit: "fill", // makes the image fit perfectly into the card
							}}
							component="img"
						/>

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
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									mt: 2,
								}}
							>
								<Typography variant="body1" fontWeight={550}>
									Price: {product.price}
								</Typography>
								<Typography variant="body1" fontWeight={550}>
									Quantity: {product.count}
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
