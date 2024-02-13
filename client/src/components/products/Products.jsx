import { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import axios from "axios";
import { SearchBar, ProductItem } from "../../components";
import { getAllProductsRoute } from "../../utils/constant";

const Products = () => {
	// state values for the products component
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [searchString, setSearchString] = useState("");

	// fetches all products from the server
	useEffect(() => {
		async function fetchAllProducts() {
			try {
				const response = await axios.get(getAllProductsRoute());
				setProducts(response.data.products);
			} catch (error) {
				console.error("Error fetching products: ", error);
			}
		}
		fetchAllProducts();
	}, []);

	// state change that happens when the searchString changes, updates products that are displayed
	useEffect(() => {
		const latestFilter = products.filter((product) =>
			product.name.toLowerCase().includes(searchString.toLowerCase())
		);
		setFilteredProducts(latestFilter);
	}, [searchString, products]);

	return (
		<Stack sx={{ mt: 2, alignItems: "center" }}>
			{/* Search Bar component, used for filtering and searching products */}
			<SearchBar
				searchString={searchString}
				setSearchString={setSearchString}
			/>

			{/* Products Grid Container, used for displaying all products  */}
			<Grid
				container
				sx={{
					maxWidth: "90%",
					justifyContent: {
						xs: "space-evenly",
						lg: searchString.length ? "start" : "space-between",
					},
					rowGap: 2,
					columnGap: searchString.length ? 2 : 0,
				}}
			>
				{filteredProducts.map((product) => (
					<ProductItem
						key={product.id}
						sx={{
							p: { xs: 0.5, sm: 1 },
							bgcolor: "darkslategray",
							width: { xs: 300, sm: 400, md: 350, lg: 330 },
						}}
						product={product}
					/>
				))}
			</Grid>
		</Stack>
	);
};

export default Products;
