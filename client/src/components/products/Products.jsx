import { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./product/ProductItem";
import { Grid, Stack } from "@mui/material";
import SearchBar from "../input/SearchBar";
import { BACKEND_BASE_URL } from "../../utils/constant";

const Products = () => {
	// state values for the products component
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [searchString, setSearchString] = useState("");

	// fetches all products from the server
	useEffect(() => {
		async function fetchAllProducts() {
			try {
				const response = await axios.get(
					`${BACKEND_BASE_URL}/products`
				);
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
							p: 2,
							bgcolor: "darkslategray",
							color: "#f3f3f3",
							width: { xs: 300, sm: 400, md: 350, lg: 320 },
						}}
						product={product}
					/>
				))}
			</Grid>
		</Stack>
	);
};

export default Products;
