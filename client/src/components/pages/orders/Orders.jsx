/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import OrderItem from "./order/OrderItem";
import { getOrderTotal } from "../../../utils/helper_functions";

const Orders = ({ orders }) => {
	return (
		<Grid container justifyContent="center">
			{orders.map((order) => {
				return (
					<OrderItem
						key={order.id}
						order={order}
						orderTotal={getOrderTotal(order?.itemInfo)}
					/>
				);
			})}
		</Grid>
	);
};

export default Orders;
