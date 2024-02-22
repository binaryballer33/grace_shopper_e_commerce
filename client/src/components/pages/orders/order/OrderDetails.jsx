import {
	Grid,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { USER_CREDENTIALS } from "../../../../utils/constant";
import ProductItem from "../../products/product/ProductItem";
import { useNavigate } from "react-router-dom";
import { getOrderTotal } from "../../../../utils/helper_functions";

const OrderDetails = () => {
	const navigate = useNavigate();
	const currentSessionData =
		JSON.parse(window.sessionStorage.getItem(USER_CREDENTIALS)) || [];
	const order = currentSessionData.selectedOrder;

	return (
		<Stack
			sx={{
				width: "100%",
				height: "auto",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Stack
				sx={{ flexDirection: { xs: "column", md: "row" } }}
				justifyContent="center"
				alignItems="center"
				mb={5}
				mt={4}
			>
				{/* Back To The Previous Page Button */}
				<IconButton onClick={() => navigate(-1)}>
					<ArrowBackIcon
						fontSize="large"
						sx={{ color: "primary.main", mr: { xs: 0, md: 2 } }}
					/>
				</IconButton>

				<Typography variant="h4" color="primary.main">
					Order Id: {order.id}
				</Typography>
				<Typography
					variant="h4"
					sx={{ color: "primary.dark", ml: { xs: 0, md: 4 } }}
				>
					Order Total: ${getOrderTotal(order?.itemInfo)}
				</Typography>
			</Stack>

			<Grid container gap={2} justifyContent="center">
				{order?.itemInfo.map((item) => {
					return (
						<Grid item key={item.productId}>
							<ProductItem
								product={item.itemDescription}
								width={{ xs: 300, md: 400 }}
								quantity={item.quantity}
							/>
						</Grid>
					);
				})}
			</Grid>

			<Typography
				variant="h4"
				sx={{ color: "primary", m: { xs: "2rem 0rem" } }}
			>
				Order Receipt
			</Typography>

			<TableContainer
				component={Paper}
				sx={{ width: { xs: "95%", md: "80%", lg: "55%" }, mb: 5 }}
			>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Order Id</TableCell>
							<TableCell align="right">Product Id</TableCell>
							<TableCell align="right">Product Name</TableCell>
							<TableCell align="right">Product Price</TableCell>
							<TableCell align="right">
								Product Quantity
							</TableCell>
							<TableCell align="right">Order Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							"& tr:nth-of-type(odd)": {
								backgroundColor: "#f3f3f3",
							},
						}}
					>
						{order?.itemInfo.map((item) => (
							<TableRow
								key={item.productId}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{item.orderId}
								</TableCell>
								<TableCell align="right">
									{item.productId}
								</TableCell>
								<TableCell align="right">
									{item.itemDescription.name}
								</TableCell>
								<TableCell align="right">
									{item.itemDescription.price}
								</TableCell>
								<TableCell align="right">
									{item.quantity}
								</TableCell>
								<TableCell align="right">
									$
									{item.itemDescription.price * item.quantity}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default OrderDetails;
