/* eslint-disable react/prop-types */
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product, ...props }) => {
	const navigate = useNavigate();

	// trick to make our components behave like MUI components
	return (
		<Grid item>
			<Box {...props} key={product.id}>
				<Card>
					<CardMedia
						image={product.image}
						alt={product.name}
						sx={{ height: 320 }}
						component="img"
					/>
					<CardContent>
						<Box
							onClick={() => navigate(`/product/${product.id}`)}
							sx={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Button
								variant="text"
								sx={{ color: "darkslategray" }}
							>
								<Typography variant="h5" fontWeight="bold">
									{product.name}
								</Typography>
							</Button>
						</Box>

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
