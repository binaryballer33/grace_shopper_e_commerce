import { Grid, Typography, IconButton, Stack } from "@mui/material";
import ContactCard from "./ContactCard";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import shaq from "../../../assets/shaq.jpg";

const Contact = () => {
	return (
		<Stack alignItems="center" justifyContent="center">
			<Typography variant="h5" color="primary.main" sx={{ mt: 4, mb: 2 }}>
				Contact Us
			</Typography>

			<Typography variant="h6" align="center" gutterBottom sx={{ mt: 2 }}>
				For 24/7 Support, Contact Us Via
			</Typography>

			{/* Social Media Icons */}
			<Grid container justifyContent="center">
				{/* Facebook card */}
				<Grid
					item
					sx={{ marginBottom: 2, height: 200, width: 300, p: 2 }}
				>
					<Stack
						sx={{
							bgcolor: "primary.main",
							height: 200,
							justifyContent: "space-evenly",
							borderRadius: 5,
						}}
					>
						<Typography
							variant="h6"
							align="center"
							color="white"
							p={2}
						>
							Connect with us on Facebook
						</Typography>
						<IconButton
							aria-label="Facebook"
							sx={{
								color: "white",
								"&.MuiIconButton-root:hover": {
									backgroundColor: "transparent",
								},
							}}
						>
							<FacebookIcon />
						</IconButton>
					</Stack>
				</Grid>

				{/* Instagram card */}
				<Grid
					item
					sx={{ marginBottom: 2, height: 200, width: 300, p: 2 }}
				>
					<Stack
						sx={{
							bgcolor: "primary.main",
							height: 200,
							justifyContent: "space-evenly",
							borderRadius: 5,
						}}
					>
						<Typography
							variant="h6"
							align="center"
							color="white"
							p={2}
						>
							Connect with us on Instagram
						</Typography>
						<IconButton
							aria-label="Instagram"
							sx={{
								color: "white",
								"&.MuiIconButton-root:hover": {
									backgroundColor: "transparent",
								},
							}}
						>
							<InstagramIcon />
						</IconButton>
					</Stack>
				</Grid>

				{/* Twitter card */}
				<Grid
					item
					sx={{ marginBottom: 2, height: 200, width: 300, p: 2 }}
				>
					<Stack
						sx={{
							bgcolor: "primary.main",
							height: 200,
							justifyContent: "space-evenly",
							borderRadius: 5,
						}}
					>
						<Typography
							variant="h6"
							align="center"
							color="white"
							p={2}
						>
							Connect with us on Twitter
						</Typography>
						<IconButton
							aria-label="Twitter"
							sx={{
								color: "white",
								"&.MuiIconButton-root:hover": {
									backgroundColor: "transparent",
								},
							}}
						>
							<TwitterIcon />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>

			<Typography
				variant="h5"
				color="primary.main"
				sx={{ marginTop: 6, marginBottom: 2 }}
			>
				Other Ways To Contact Us
			</Typography>

			{/* Existing ContactCard components */}
			<Grid
				container
				justifyContent="center"
				spacing={2}
				textAlign="center"
			>
				<Grid item>
					<ContactCard
						name="Shaquille Rashad Mandy"
						email="john.doe@example.com"
						phone="+1 123-456-7890"
						linkedin="www.linkedin.com/in/
            shaquille-mandy-525079111"
						image={shaq}
					/>
				</Grid>
				<Grid item>
					<ContactCard
						name="Andrew"
						email="johndoe@example.com"
						phone="+1 987-654-3210"
						linkedin="linkedin.com/in/johndoe"
					/>
				</Grid>
				<Grid item>
					<ContactCard
						name="Nick Mack"
						email="nickmack44@gmail.com"
						phone="+1 555-555-5555"
						linkedin="linkedin.com/in/mack26"
					/>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default Contact;
