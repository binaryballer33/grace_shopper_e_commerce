import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { useLogoutMutation } from "../../../api/userApi";
import { USER_CREDENTIALS } from "../../../utils/constant";

const LogoutFailure = () => {
	return (
		<Stack
			sx={{
				width: "100vw",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Typography
				variant="h5"
				component={Link}
				to="/auth"
				sx={{
					textDecoration: "none",
					textAlign: "center",
					color: "primary",
				}}
			>
				Something Went Wrong, Please Try To Logout Again
			</Typography>
		</Stack>
	);
};

const LogoutSuccess = () => {
	return (
		<Stack
			sx={{
				width: "100%",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Typography
				variant="h5"
				color="primary"
				sx={{ textAlign: "center" }}
			>
				You Have Been Loged Out Successfully
			</Typography>
		</Stack>
	);
};

const Logout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentLocation = location.pathname; // used to check if the user navigates to another page
	const [logout] = useLogoutMutation();
	const token = window.sessionStorage.getItem(USER_CREDENTIALS);

	useEffect(() => {
		async function logoutUser() {
			try {
				await logout();
			} catch (error) {
				console.error("Error Logging Out: ", error);
			}
		}
		logoutUser();
	}, [logout]);

	useEffect(() => {
		/* if the user is still on the logout page after 4 seconds, redirect to home page
		 *  else if the user navigates to another page in less than 4 seconds, do nothing
		 */
		const timer = setTimeout(() => {
			if (location.pathname === currentLocation) {
				navigate("/products");
			}
		}, 4000);

		// Cleanup function to clear the timeout when the component unmounts
		return () => clearTimeout(timer);
	}, [currentLocation, location.pathname, navigate]);

	if (!token) {
		return <LogoutSuccess />;
	} else {
		return <LogoutFailure />;
	}
};

export default Logout;
