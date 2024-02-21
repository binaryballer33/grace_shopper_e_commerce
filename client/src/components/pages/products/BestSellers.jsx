import { useGetProductsQuery } from "../../../api/productApi";
import { Error, Loading, ProductItem } from "../../../components";
import {
	Box,
	Grid,
	Typography,
	createTheme,
	useMediaQuery,
} from "@mui/material";

//  Best Selling Products
const BestSellers = () => {
	// fetches all products from the backend using redux toolkit query
	const { data, error, isLoading } = useGetProductsQuery();
	const theme = createTheme();
	const bestSellerNames = ["apple", "grapes", "blueberry"];
	const typographyVariant = useMediaQuery(theme.breakpoints.down("sm"))
		? "h4"
		: "h2";

	if (isLoading) {
		return <Loading />;
	} else if (error) {
		return <Error error={error} />;
	} else {
		const bestSellers = data.products.filter((product) =>
			bestSellerNames.includes(product.name.toLowerCase())
		);

		return (
			<Box>
				<Typography
					variant={typographyVariant}
					sx={{
						margin: "2rem 0rem 1rem 0rem",
						textAlign: "center",
						color: "primary.main",
					}}
				>
					Best Sellers
				</Typography>
				<Grid container gap={2} justifyContent="center" mb={2}>
					{bestSellers.map((product) => (
						<ProductItem
							key={product.id}
							product={product}
							sx={{
								p: { xs: 0.5, sm: 1 },
								bgcolor: "primary.main",
								width: { xs: 300, sm: 400, md: 350, lg: 400 },
							}}
						/>
					))}
				</Grid>
			</Box>
		);
	}
};

export default BestSellers;
