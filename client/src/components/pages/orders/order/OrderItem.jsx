/* eslint-disable react/prop-types */
import {
	Box,
	Button,
	Card,
	Divider,
	Grid,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { USER_CREDENTIALS } from "../../../../utils/constant";

const OrderItem = ({ order, orderTotal, ...props }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		// store the clicked order object in the session storage
		const currentSessionData =
			JSON.parse(window.sessionStorage.getItem(USER_CREDENTIALS)) || [];
		currentSessionData.selectedOrder = order;
		window.sessionStorage.setItem(
			USER_CREDENTIALS,
			JSON.stringify(currentSessionData)
		);

		// then navigate to the order details page
		navigate(`/orderdetails/${order.id}`);
	};

	return (
		<Grid item>
			{/* trick to make our components behave like MUI components and inherit their props */}
			<Box {...props} key={order.id} onClick={handleClick}>
				<Tooltip title={`Order Id: ${order.id}`} placement="top">
					<Card elevation={10} sx={{ width: 250, height: 250, m: 2 }}>
						{/* text inside of the card */}
						<Stack
							sx={{
								p: 2,
								//  height of the text container after subtracting the padding
								height: 200,
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							{/* Styling for the button name */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Typography
									variant="h5"
									fontWeight="bold"
									color="primary.main"
								>
									Order Details
								</Typography>
							</Box>

							{/* Order Created At */}
							<Box>
								<Typography
									variant="body1"
									sx={{ textAlign: "center" }}
								>
									<Typography
										component="span"
										sx={{ fontWeight: "bold" }}
									>
										Order {order.id}
									</Typography>{" "}
									Created Date:
								</Typography>
								{<Divider />}
								<Typography variant="body1" color="initial">
									{new Date(order.createdAt).toLocaleString()}
								</Typography>
							</Box>

							{/* Add The First 3 Products To The Card, Put A  "..." after the final item  */}
							<Box>
								<Typography variant="body1" color="initial">
									{order.itemInfo.map((item, index) => {
										if (index < 3) {
											return index !==
												order.itemInfo.length - 1
												? `${item.itemDescription.name}, `
												: `${item.itemDescription.name}...`;
										}
									})}
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									mt: 2,
								}}
							>
								<Typography variant="body1" fontWeight={550}>
									<Typography
										component="span"
										fontWeight={550}
										sx={{
											color: "primary.main",
										}}
									>
										{`Order Total: $${
											orderTotal || order.total
										}`}
									</Typography>
								</Typography>
							</Box>
						</Stack>
					</Card>
				</Tooltip>
			</Box>
		</Grid>
	);
};

export default OrderItem;
