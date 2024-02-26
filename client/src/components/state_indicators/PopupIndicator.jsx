/* eslint-disable react/prop-types */
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";

const PopupIndicator = ({ cartUpdated, message, timeout }) => {
	// state to control the snackbar
	const [open, setOpen] = useState(true);

	/* useEffect to open the snackbar when the cart is updated,
	 * otherwise it remains closed after opening just the first time
	 */
	useEffect(() => {
		if (cartUpdated.updated) setOpen(true);
	}, [cartUpdated]);

	// function to close the snackbar
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={timeout || 2000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					variant="filled"
					sx={{ width: "100%" }}
				>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default PopupIndicator;
