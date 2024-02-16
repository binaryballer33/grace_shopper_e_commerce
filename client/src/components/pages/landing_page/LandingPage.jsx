import { Stack, Typography } from "@mui/material";

const LandingPage = () => {
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
				Landing Page
			</Typography>
		</Stack>
	);
};

export default LandingPage;
