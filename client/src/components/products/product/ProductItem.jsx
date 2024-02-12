/* eslint-disable react/prop-types */
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";

const ProductItem = ({ product, ...props }) => {
	// trick to make our components behave like MUI components
	return (
		<Grid item>
			<Box {...props} key={product.id}>
				<Card>
					<CardMedia
						image={product.image}
						alt={product.name}
						component="iamge"
						sx={{ height: 320 }}
					/>
					<CardContent>
						<Typography
							variant="h5"
							sx={{ textAlign: "center", fontWeight: "bold" }}
						>
							{product.name}
						</Typography>
						<Typography
							variant="body1"
							sx={{ textAlign: "center" }}
						>
							{product.description}
						</Typography>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								mt: 2,
							}}
						>
							<Typography variant="body1">
								Price: {product.price}
							</Typography>
							<Typography variant="body1">
								Quantity: {product.count}
							</Typography>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Grid>
	);
};

export default ProductItem;
