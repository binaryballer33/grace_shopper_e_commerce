/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { SearchBar, ProductItem, Loading, Error } from "../../../components";
import { useGetProductsQuery } from "../../../api/productApi";

const RenderProducts = ({ products }) => {
	const [searchString, setSearchString] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(products);

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
				{/* displays only the products that are available after the filter */}
				{filteredProducts.map((product) => (
					<ProductItem
						key={product.id}
						sx={{
							p: { xs: 0.5, sm: 1 },
							bgcolor: "primary.main",
							width: { xs: 300, sm: 400, md: 350, lg: 330 },
						}}
						product={product}
					/>
				))}
			</Grid>
		</Stack>
	);
};

const Products = () => {
	// fetches all products from the backend using redux toolkit query
	const { data, error, isLoading } = useGetProductsQuery();

	if (isLoading) {
		return <Loading isLoading={isLoading} />;
	} else if (!data) {
		return <Error error={error} />;
	} else {
		return <RenderProducts products={data.products} />;
	}
};
export default Products;
