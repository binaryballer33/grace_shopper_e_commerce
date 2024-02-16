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
	Stack,
	Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import navBarLogo from "../../assets/greenAppleLogo.avif";
import { USER_CREDENTIALS } from "../../utils/constant";

const NavBar = () => {
	// links and account options
	const pages = ["Testimonials", "Contact"];
	const settings = ["Profile", "Cart", "Log In", "Register", "Log Out"];

	// get the user credentials from the session storage
	const { token, user } = JSON.parse(
		window.sessionStorage.getItem(USER_CREDENTIALS)
	) || { token: "", user: {} };

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
					</Button>
					<Typography
						variant="h6"
						noWrap
						component={Link}
						to="/products"
						sx={{
							display: "flex",
							fontWeight: 700,
							letterSpacing: ".2rem",
							color: "white",
							textDecoration: "none",
						}}
					>
						<Stack
							sx={{
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							Products
						</Stack>
					</Typography>

					{/* create the NavBar links */}
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

					{/* create the user settings menu */}
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
								// if the user is logged in, do not render the log in and register options
								if (
									token &&
									user &&
									(setting === "Log In" ||
										setting === "Register")
								) {
									return null;
								} else if (
									// if the user is not logged in, do not render the profile and log out options
									(!token || !user) &&
									(setting === "Profile" ||
										setting === "Log Out")
								) {
									return null;
								}
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
