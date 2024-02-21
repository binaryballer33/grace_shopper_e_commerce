import { useNavigate } from "react-router-dom";
import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Checkout = () => {
	const navigate = useNavigate();
	return (
		<Stack
			sx={{
				width: "100dvw",
				height: "100dvh",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: { xs: "column", md: "row" },
			}}
		>
			{/* Back To The Previous Page Button */}
			<IconButton onClick={() => navigate(-1)}>
				<ArrowBackIcon
					fontSize="large"
					sx={{ color: "primary.main", mr: { xs: 0, md: 2 } }}
				/>
			</IconButton>
			<Typography
				variant="h2"
				color="primary.main"
				sx={{ ml: { xs: 0, md: 2 } }}
			>
				Checkout
			</Typography>
		</Stack>
	);
};

export default Checkout;
