import {
	Stack,
	Paper,
	ListItem,
	ListItemText,
	Box,
	Typography,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// TODO: fix styling for page
const RenderStars = ({ amountOfStars }) => {
	return Array.from({ length: amountOfStars || 5 }).map((_, i) => (
		<StarBorderIcon
			key={i}
			sx={{
				color: "gold",
				p: 0.5,
				transition: "opacity 0.3s ease",
				"&:hover": {
					color: "goldenrod",
				},
			}}
		/>
	));
};

const Testimonials = () => {
	// Array of testimonies
	const testimonies = [
		{
			text: "I have been searching for fresh organic fruit for awhile and I am glad that I came across this company. Their website is very user friendly and they have really good deals for fruit. Also if any fruit arrives damaged, the company is very good about replacing the products or giving you a refund. I would highly recommend anyone that is searching for organic fruit at decent prices to shop with this company.",
			author: "John Doe",
			company: "ABC Inc.",
		},
		{
			text: "When I first came across this website I thought that it was a scam because I did not believe that prices for organic fruit could be so low. When I got my first shipment and saw that it was fresh fruit that was professionally wrapped i was shocked. I recommend this company to people looking for fresh fruit.",
			author: "Jane Smith",
			company: "XYZ Corp.",
		},
		{
			text: "As an elderly person this website is very easy to use. I was able to find everything that I was looking for in a timely manner and came across no issues. When I received my delivery, there was no damage to my products and everything was fresh just as it was advertised. I am very satisfied with my order.",
			author: "Alex Johnson",
			company: "123 Industries",
		},
		{
			text: "I have many other websites to choose from to get fresh organic fruit but I rather use this website. The website is very easy to use, and I had a small issue while checking out my products. I called the customer service number and they answered the phone professionally and was able to help me with my problem right away with no issues. When I received my delivery I was not disappointed at all and I will definitely be buying from here again in the future.",
			author: "Emily Brown",
			company: "456 Corporation",
		},
		{
			text: "If you want to shop at a business that cares about there customers, then I recommend you choose this place. They're customer service is amazing and the products that they sell are amazing as well. I have had a great experience with them, and all my friends and family that I have recommended this company to have nothing but great things to say about them.",
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
								bgcolor: "primary.main",
							}}
						>
							<Paper variant="outlined">
								<ListItem>
									<ListItemText
										primary={testimonies[0].text}
										secondary={`- ${testimonies[0].author}, ${testimonies[0].company}`}
									/>
								</ListItem>
								<RenderStars amountOfStars={5} />
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
								<RenderStars amountOfStars={4} />
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
								width: { xs: "calc(100% - 34px)", md: "30%" },
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
								<RenderStars amountOfStars={3} />
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
								bgcolor: "primary.main",
							}}
						>
							<Paper variant="outlined">
								<ListItem>
									<ListItemText
										primary={testimonies[3].text}
										secondary={`- ${testimonies[3].author}, ${testimonies[3].company}`}
									/>
								</ListItem>
								<RenderStars amountOfStars={4} />
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
							bgcolor: "primary.main",
						}}
					>
						<Paper variant="outlined">
							<ListItem>
								<ListItemText
									primary={testimonies[4].text}
									secondary={`- ${testimonies[4].author}, ${testimonies[4].company}`}
								/>
							</ListItem>
							<RenderStars amountOfStars={5} />
						</Paper>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};
export default Testimonials;
