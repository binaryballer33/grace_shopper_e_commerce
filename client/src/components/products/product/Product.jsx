/* eslint-disable react/prop-types */
import { Stack, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const Product = () => {
	const [product, setProduct] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchProduct() {
			try {
				const response = await axios.get(
					`${BACKEND_BASE_URL}/products/product/${id}`
				);
				setProduct(response.data.product);
			} catch (error) {
				console.error("Error fetching product: ", error);
			}
		}
		fetchProduct();
	}, [id]);

	// trick to make our components behave like MUI components
	return (
		<Stack
			sx={{
				height: "100vh",
				width: "100vw",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<ProductItem
				product={product}
				mb={3}
				sx={{ width: { xs: 320, sm: 400, md: 500, lg: 600 } }}
			/>
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
				<Typography variant="h4" color="darkslategray">
					Back To All Products
				</Typography>
			</Button>
		</Stack>
	);
};

export default Product;
