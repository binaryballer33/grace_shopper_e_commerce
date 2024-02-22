/* eslint-disable react/prop-types */
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { USER_CREDENTIALS } from "../../../utils/constant";
import { useGetProfileQuery } from "../../../api/userApi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Error, Loading, Orders } from "../../../components";

const ProfileSuccess = ({ user }) => {
	const { data, isLoading, error, refetch } = useGetProfileQuery();

	/*
	 * fixes the issue when someone logs out and then logs in with a different account
	 * the call to the backend returns the previous user's data
	 */
	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading) {
		return <Loading />;
	} else if (error) {
		return <Error error={error} />;
	} else {
		const orders = data.orders;
		return (
			<Grid container>
				{/* User Profile Information */}
				<Grid item xs={12} md={3} display="flex">
					<Stack
						sx={{
							border: "1px solid black",
							alignItems: "center",
							justifyContent: { xs: "center", md: "flex-start" },
							width: "100%",
							textAlign: "center",
						}}
					>
						<Typography
							variant="h6"
							color="inherit"
							sx={{ textDecoration: "none", mt: 3, mb: 3, p: 2 }}
						>
							Account Id: {user.id}
						</Typography>
						<Typography
							variant="h6"
							color="primary"
							sx={{ textDecoration: "none", mb: 3, p: 2 }}
						>
							Welcome {user.firstname} {user.lastname}
						</Typography>
						<Typography
							variant="h6"
							color="inherit"
							sx={{ textDecoration: "none", mb: 3, p: 2 }}
						>
							Username: {user.username}
						</Typography>
						<Typography
							variant="h6"
							color="primary"
							sx={{ textDecoration: "none", mb: 3, p: 2 }}
						>
							Products In Cart:{" "}
							{orders.incart[0]?.itemInfo.length || 0}
						</Typography>
					</Stack>
				</Grid>

				{/* User Order Information */}
				<Grid item xs={12} md={9}>
					<Stack
						sx={{
							border: "1px solid black",
							width: "100%",
							p: { xs: 0, md: 2 },
							overflow: "auto",
							height: "100dvh",
						}}
					>
						<Typography
							variant="h4"
							textAlign="center"
							color="primary.dark"
							sx={{
								margin: { xs: "1rem 0rem", md: "2rem 0rem" },
							}}
						>
							Here Are Your Orders {user.firstname}
						</Typography>
						{/* All The Orders */}
						<Stack
							sx={{
								alignItems: "center",
								justifyContent: "space-evenly",
							}}
						>
							{/* In Cart Orders */}
							<Box
								sx={{
									width: { xs: "95%", md: "90%" },
									margin: "3rem 0rem",
									textAlign: "center",
								}}
							>
								<Button
									component={Link}
									to="/cart"
									sx={{ textTransform: "none" }} // stop mui button from transforming text to uppercase
								>
									<Typography
										variant="h4"
										sx={{
											textDecoration: "none",
											color: "primary.main",
										}}
									>
										In Cart Orders
									</Typography>
								</Button>
								<Divider />
								<Orders orders={orders.incart} />
							</Box>

							{/* Fulfilled Orders */}
							<Box
								sx={{
									width: { xs: "95%", md: "90%" },
									margin: "3rem 0rem",
									textAlign: "center",
								}}
							>
								<Typography variant="h4">
									Fulfilled Orders
								</Typography>
								<Divider />
								<Orders orders={orders.fulfilled} />
							</Box>

							{/* Cancelled Orders */}
							<Box
								sx={{
									width: { xs: "95%", md: "90%" },
									margin: "3rem 0rem",
									textAlign: "center",
								}}
							>
								<Typography variant="h4" color="primary.main">
									Cancelled Orders
								</Typography>
								<Divider />
								<Orders orders={orders.cancelled} />
							</Box>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		);
	}
};

const ProfileFailure = () => {
	return (
		<Stack
			sx={{
				width: "100%",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
			}}
		>
			<Typography variant="h4" color="primary">
				You Must Log In To Access Your Profile
			</Typography>
		</Stack>
	);
};

const Profile = () => {
	/*  get the token and user from session storage if it exists
	 *  if not return empty user and empty token and render ProfileFailure component
	 */
	const { token, user } = JSON.parse(
		window.sessionStorage.getItem(USER_CREDENTIALS)
	) || { token: "", user: {} };

	if (!token || !user) {
		return <ProfileFailure />;
	} else {
		return <ProfileSuccess user={user} />;
	}
};

export default Profile;
