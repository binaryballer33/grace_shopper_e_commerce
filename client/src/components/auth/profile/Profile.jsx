/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import { USER_CREDENTIALS } from "../../../utils/constant";
import { useGetProfileQuery } from "../../../api/userApi";
import { useEffect } from "react";

const ProfileSuccess = ({ user }) => {
	const { data, isLoading, isError, error, refetch } = useGetProfileQuery();

	/*
	 * fixes the issue when someone logs out and then logs in with a different account
	 * the call to the backend returns the previous user's data
	 */
	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<Stack
			sx={{
				width: "100%",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Typography variant="h4">Profile</Typography>
			<Typography varient="body1">{user.email}</Typography>
			<Typography varient="body1">{user.username}</Typography>
			<Typography varient="body1">{user.id}</Typography>
			<Typography varient="body1">{user.firstname}</Typography>
			<Typography varient="body1">{user.lastname}</Typography>
		</Stack>
	);
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
	// get the token and user from session storage if exists, if not return empty user and token
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
