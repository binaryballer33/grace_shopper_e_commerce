/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Button, Typography } from "@mui/material";
import axios from "axios";
import { ProductItem } from "../../../components";
import { getProductByIdRoute } from "../../../utils/constant";

const Product = () => {
	const [product, setProduct] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchProduct() {
			try {
				const response = await axios.get(getProductByIdRoute(id));
				setProduct(response.data.product);
			} catch (error) {
				console.error("Error fetching product: ", error);
			}
		}
		fetchProduct();
	}, [id]);

	return (
		// stack component used for centering the product item and the back button
		<Stack
			sx={{
				height: "100vh",
				width: "100vw",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{/* Product Item component, used for displaying a single product */}
			<ProductItem
				product={product}
				mb={3}
				sx={{ width: { xs: 300, sm: 400, md: 500, lg: 600 } }}
			/>

			{/* Navigate back to previous page button */}
			<Button
				variant="contained"
				onClick={() => navigate(-1)} // go back to the previous page
				sx={{
					ml: "1rem",
					mr: "1rem",
					bgcolor: "#f3f3f3",
					":hover": { bgcolor: "white" },
				}}
			>
				<Typography variant="h5" color="darkslategray">
					Back To All Products
				</Typography>
			</Button>
		</Stack>
	);
};

export default Product;
