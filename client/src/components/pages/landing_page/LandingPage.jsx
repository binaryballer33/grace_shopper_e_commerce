import {
	Box,
	Stack,
	Typography,
	createTheme,
	useMediaQuery,
} from "@mui/material";
import landingPageLogo from "../../../assets/fruit_market.avif";
import fieldImage from "../../../assets/field.avif";
import { BestSellers } from "../../../components";

const LandingPage = () => {
	const theme = createTheme();
	const typographyVariant = useMediaQuery(theme.breakpoints.down("sm"))
		? "h4"
		: "h2";
	const landingPageText = "Welcome To The A.M.S Fruit Market";

	return (
		<Stack>
			<Box
				sx={{
					width: "100%",
					minHeight: { xs: 400, md: 860 },
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexBasis: "content",
					"& img": {
						width: "100%",
						minHeight: { xs: 400, md: 860 },
						animation: "zoom 24s infinite",
						opacity: 0.3,
						position: "relative",
						"@keyframes zoom": {
							"0%": {
								transform: "scale(1)",
							},
							"50%": {
								transform: "scale(1.1)",
							},
							"100%": {
								transform: "scale(1)",
							},
						},
					},
				}}
			>
				<img
					style={{
						width: "100%",
						minHeight: { xs: 400, md: 860 },
					}}
					src={landingPageLogo}
					alt="Landing Page Image"
				/>

				<Box
					sx={{
						position: "absolute",
						top: { xs: "35%", md: "50%" },
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					{/* To do the animation the text has to be returned one letter at a time */}
					{landingPageText.split("").map((letter, index) => (
						<Typography
							key={index}
							variant={typographyVariant}
							component="span"
							sx={{
								color: "primary.main",
								opacity: 0,
								animation: "fade-in 1s forwards",
								animationDelay: `${index * 0.1}s`,
								"@keyframes fade-in": {
									"0%": {
										opacity: 0,
									},
									"100%": {
										opacity: 1,
									},
								},
							}}
						>
							{letter}
						</Typography>
					))}
				</Box>
			</Box>

			{/* Landing Page Content */}
			<Stack
				sx={{
					width: "100%",
					height: "auto",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<BestSellers />

				{/* Field Image and Text */}
				<Stack m="5rem 0rem" p={2} alignItems="center">
					<Typography
						variant={typographyVariant}
						textAlign="center"
						mb={2}
					>
						Cultivation Process
					</Typography>
					<Stack
						width="82%"
						sx={{
							flexDirection: { xs: "column", md: "row" },
						}}
					>
						<img
							style={{
								width: "100%",
								maxHeight: 500,
								boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
								marginRight: "2rem",
								marginBottom: "1rem",
							}}
							src={fieldImage}
							alt="Field Image"
						/>
						<Typography
							variant="body1"
							sx={{ lineHeight: 2.5, textAlign: "center" }}
						>
							Fruit cultivation begins with selecting suitable
							land and planting chosen varieties either from
							seeds, seedlings, or saplings, followed by attentive
							care such as watering, mulching, and pest control
							during the plant's early stages. Fruit trees are
							pruned, trained, and fertilized to ensure healthy
							growth and optimal fruit production. Throughout the
							growing season, farmers monitor their orchards for
							pests and diseases, employing integrated pest
							management practices and applying necessary
							treatments. When fruits reach maturity, they are
							harvested, sorted, and packed for distribution.
							Continuous maintenance, including soil management
							and ongoing care, ensures sustained fruit production
							year after year.
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LandingPage;
