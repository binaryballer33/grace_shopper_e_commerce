import {
	Stack,
	Paper,
	ListItem,
	ListItemText,
	Box,
	Typography,
} from "@mui/material";

const Testimonials = () => {
	// Array of testimonies
	const testimonies = [
		{
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			author: "John Doe",
			company: "ABC Inc.",
		},
		{
			text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
			author: "Jane Smith",
			company: "XYZ Corp.",
		},
		{
			text: "Curabitur blandit, risus ac condimentum malesuada, ipsum ex eleifend mauris, sit amet ultricies odio lorem quis odio.",
			author: "Alex Johnson",
			company: "123 Industries",
		},
		{
			text: "Maecenas tempus sapien nec nisl blandit, non volutpat lacus fermentum.",
			author: "Emily Brown",
			company: "456 Corporation",
		},
		{
			text: "Nullam hendrerit metus vel dolor placerat lacinia.",
			author: "Michael Davis",
			company: "789 Enterprises",
		},
	];

	return (
		<Box>
			<Typography
				variant="h4"
				color="primary.main"
				textAlign="center"
				mt={2}
			>
				What Are Customers Are Saying
			</Typography>
			<Stack
				sx={{
					width: "100dvw",
					minHeight: "100dvh",
					alignItems: "center",
					flexDirection: { xs: "column", sm: "row" },
					// gets rid of the margin top that was auto given to the second box
					"& > :not(style) ~ :not(style)": {
						margin: 0,
					},
				}}
				spacing={4}
			>
				{/* Left Side, Main Content */}
				<Box
					sx={{
						width: { xs: "90%", md: "75%" },
						minHeight: { xs: "66dvh", md: "100dvh" },
						p: 2,
					}}
				>
					{/* Top Row */}
					<Stack
						sx={{
							flexDirection: { xs: "column", md: "row" },
							minHeight: "50dvh",
						}}
					>
						{/* Top Row Left Box */}
						<Box
							sx={{
								width: { xs: "calc(100% - 34px)", md: "70%" },
								minHeight: { xs: 0, md: 300 }, // min height 0px on xs to allow the box to shrink and not exceed the 50dvh
								border: "1px solid black",
								borderRadius: 3,
								p: 2,
								marginRight: { xs: 0, md: 2 },
								marginBottom: { xs: 2, md: 0 },
								flexGrow: 1, // allows the box to grow and take up the remaining space ( there will be some, and can use because parent element is display flex )
							}}
						>
							<Paper variant="outlined">
								<ListItem>
									<ListItemText
										primary={testimonies[0].text}
										secondary={`- ${testimonies[0].author}, ${testimonies[0].company}`}
									/>
								</ListItem>
							</Paper>
						</Box>

						{/* Top Row Right Box */}
						<Box
							sx={{
								width: { xs: "calc(100% - 34px)", md: "30%" },
								minHeight: { xs: 0, md: 300 }, // min height 0px on xs to allow the box to shrink and not exceed the 50dvh
								border: "1px solid black",
								borderRadius: 3,
								p: 2,
								flexGrow: 1, // allows the box to grow and take up the remaining space ( there will be some, and can use because parent element is display flex )
							}}
						>
							<Paper variant="outlined">
								<ListItem>
									<ListItemText
										primary={testimonies[1].text}
										secondary={`- ${testimonies[1].author}, ${testimonies[1].company}`}
									/>
								</ListItem>
							</Paper>
						</Box>
					</Stack>

					{/* Bottom Row */}
					<Stack
						sx={{
							flexDirection: { xs: "column", md: "row" },
							minHeight: "50dvh",
							mt: 2,
						}}
					>
						{/* Bottom Row Left Box */}
						<Box
							sx={{
								width: { xs: "calc(100% - 34px)", md: "70%" },
								minHeight: { xs: 0, md: 300 }, // min height 0px on xs to allow the box to shrink and not exceed the 50dvh
								border: "1px solid black",
								borderRadius: 3,
								p: 2,
								marginRight: { xs: 0, md: 2 },
								marginBottom: { xs: 2, md: 0 },
								flexGrow: 1, // allows the box to grow and take up the remaining space ( there will be some, and can use because parent element is display flex )
							}}
						>
							<Paper variant="outlined">
								<ListItem>
									<ListItemText
										primary={testimonies[2].text}
										secondary={`- ${testimonies[2].author}, ${testimonies[2].company}`}
									/>
								</ListItem>
							</Paper>
						</Box>

						{/* Bottom Row Right Box */}
						<Box
							sx={{
								width: { xs: "calc(100% - 34px)", md: "70%" },
								minHeight: { xs: 0, md: 300 }, // min height 0px on xs to allow the box to shrink and not exceed the 50dvh
								border: "1px solid black",
								borderRadius: 3,
								p: 2,
								flexGrow: 1, // allows the box to grow and take up the remaining space ( there will be some, and can use because parent element is display flex )
							}}
						>
							<Paper variant="outlined">
								<ListItem>
									<ListItemText
										primary={testimonies[3].text}
										secondary={`- ${testimonies[3].author}, ${testimonies[3].company}`}
									/>
								</ListItem>
							</Paper>
						</Box>
					</Stack>
				</Box>

				{/* Right Side, Side Content */}
				<Box
					sx={{
						width: { xs: "90%", md: "25%" },
						minHeight: { xs: "33dvh", sm: "100dvh" },
						p: 2,
					}}
				>
					<Box
						/* the left side main content container has a margin top of 16px and two different borders of 1px each
						 * so subtracting 16px and 2px from 100vh to make the right side container
						 * the same height as the left side container
						 */
						sx={{
							minHeight: {
								xs: "33dvh",
								sm: "calc(100dvh - 16px - 2px)",
							},
							border: "1px solid black",
							p: 2,
							borderRadius: 3,
						}}
					>
						<Paper variant="outlined">
							<ListItem>
								<ListItemText
									primary={testimonies[4].text}
									secondary={`- ${testimonies[4].author}, ${testimonies[4].company}`}
								/>
							</ListItem>
						</Paper>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};
export default Testimonials;
