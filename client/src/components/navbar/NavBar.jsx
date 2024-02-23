import { useState } from "react";
import { Link } from "react-router-dom";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
	Menu,
	Divider,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import navBarLogo from "../../assets/greenAppleLogo.avif";
import { USER_CREDENTIALS } from "../../utils/constant";

const NavBar = () => {
	// get the user credentials from the session storage
	const { token, user } = JSON.parse(
		window.sessionStorage.getItem(USER_CREDENTIALS)
	) || { token: "", user: {} };

	// modify the theme based on the screen size
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

	// links and account options
	const pages = ["Products", "Testimonials", "Contact"];
	// show the correct options based on the user's login status
	const settings = token
		? ["Cart", "Profile", "Log Out"]
		: ["Cart", "Log In", "Register"];

	// state variables
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	// handlers
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="sticky" sx={{ bgcolor: "primary" }}>
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{ justifyContent: "space-around", width: "100%" }}
				>
					{/* When the screen size is small, change the look of the NavBar */}
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>

						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
								>
									<Typography
										component={Link}
										to={`/${page
											.replace(" ", "")
											.toLowerCase()}`}
										sx={{
											my: 2,
											color: "primary.main",
											display: "block",
											textDecoration: "none",
											textAlign: "center",
										}}
									>
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					{/*  This is for Logo, Using component = React Router Dom Link in order to get rid of unwanted styling */}
					<Button component={Link} to="/" sx={{ p: 0 }}>
						<img
							id="logo-image"
							src={navBarLogo}
							alt="The Products logo"
							style={{
								height: "45px",
								width: "45px",
								borderRadius: "50%",
							}}
						/>
						<Typography
							variant="h6"
							noWrap
							sx={{
								display: "flex",
								letterSpacing: "2px",
								color: "white",
								textDecoration: "none",
								ml: 1,
							}}
						>
							{isSmallScreen
								? "M.A.S Fruit"
								: "M.A.S Fruit Market"}
						</Typography>
					</Button>

					{/* create the NavBar links in the pages array */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "end",
							mr: 2,
						}}
					>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								component={Link}
								to={`/${page.replace(" ", "").toLowerCase()}`}
								sx={{
									my: 2,
									color: "white",
									display: "block",
									textDecoration: "none",
								}}
							>
								{page}
							</Button>
						))}
					</Box>

					{/* create the user settings menu inside of the profile menu button */}
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar>
									<PersonIcon
										sx={{ color: "primary.dark" }}
									/>
								</Avatar>
							</IconButton>
						</Tooltip>

						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{/* Renders User's Name If They Are Logged In */}
							{token && user && (
								<Box>
									<Typography
										variant="body1"
										color="primary.main"
										textAlign="center"
									>
										Hi {user.firstname}
									</Typography>
									<Divider
										sx={{
											mt: 1,
											mb: 1,
											borderColor: "primary.dark",
										}}
									/>
								</Box>
							)}
							{/* Only Return MenuItems That Make Sense For The Situation */}
							{settings.map((setting) => {
								return (
									<MenuItem
										key={setting}
										onClick={handleCloseUserMenu}
									>
										<Typography
											textAlign="center"
											component={Link}
											to={`/${setting
												.replace(" ", "")
												.toLowerCase()}`}
											sx={{
												textDecoration: "none",
												color: "inherit",
											}}
										>
											{setting}
										</Typography>
									</MenuItem>
								);
							})}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;
