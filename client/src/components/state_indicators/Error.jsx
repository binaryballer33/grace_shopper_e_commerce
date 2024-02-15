/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";

const Error = ({ error, height }) => (
	<Stack
		alignItems="center"
		justifyContent="center"
		height={height || "80vh"}
		textAlign="center"
	>
		<Typography variant="h4" color="red" mb={2}>
			Error Status: {error.data.status}
		</Typography>
		<Typography variant="h4" color="red">
			Error Message: {error.data.message}
		</Typography>
	</Stack>
);

export default Error;
