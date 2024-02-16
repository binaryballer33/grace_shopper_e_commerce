import { Stack, Typography } from "@mui/material";

const Contact = () => {
	return (
		<Stack
			sx={{
				width: "100%",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Typography variant="h5" color="primary.main">
				Contact
			</Typography>
		</Stack>
	);
};

export default Contact;
