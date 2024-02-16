/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Button, Typography } from "@mui/material";
import { Error, Loading, ProductItem } from "../../../../components";
import { useGetProductByIdQuery } from "../../../../api/productApi";

const RenderProduct = ({ product }) => {
	const navigate = useNavigate();

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
				<Typography variant="h6" sx={{ color: "primary.dark" }}>
					Back To All Products
				</Typography>
			</Button>
		</Stack>
	);
};

const Product = () => {
	const { id } = useParams();
	const { data, error, isLoading } = useGetProductByIdQuery(id);

	if (isLoading) {
		return <Loading />;
	} else if (error) {
		return <Error error={error} />;
	} else {
		return <RenderProduct product={data.product} />;
	}
};

export default Product;
