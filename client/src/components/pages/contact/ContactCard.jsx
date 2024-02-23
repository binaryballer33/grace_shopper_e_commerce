/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, Stack, CardMedia } from "@mui/material";

const ContactCard = ({ name, email, phone, linkedin, image }) => {
	const IMG_URL =
		"https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg";

	return (
		<Card
			sx={{
				width: { xs: 300, md: 350 },
				height: 700,
				color: "white",
				mb: 2,
			}}
		>
			<CardContent sx={{ minHeight: 700, bgcolor: "primary.main" }}>
				{/* Change the background color here */}
				<CardMedia
					image={image || IMG_URL}
					alt={name}
					sx={{
						height: 320,
						objectFit: "fill", // makes the image fit perfectly into the card
						transition: "opacity 0.3s ease",
						"&:hover": {
							opacity: 0.2,
						},
						mb: 2,
					}}
					component="img"
				/>
				<Stack
					spacing={5}
					alignItems="center"
					bgcolor="#f3f3f3"
					color="primary.main"
					minHeight={300}
					p={2}
				>
					<Typography variant="h5" gutterBottom textAlign="center">
						{name}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<span style={{ fontWeight: "bold" }}>Email: </span>
						{email}
					</Typography>
					<Typography
						variant="body1"
						gutterBottom
						style={{ marginBottom: "8px" }}
					>
						<span style={{ fontWeight: "bold" }}>Phone: </span>
						{phone}
					</Typography>
					<Typography
						variant="body1"
						gutterBottom
						style={{ marginBottom: "8px" }}
					>
						<span style={{ fontWeight: "bold" }}>LinkedIn: </span>
						{linkedin}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default ContactCard;
