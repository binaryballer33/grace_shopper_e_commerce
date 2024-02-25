/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Box,
	Paper,
	TextField,
	Button,
	Typography,
	Stack,
	InputAdornment,
	Tooltip,
	IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useLoginMutation, useRegisterMutation } from "../../../api/userApi";
import { Error, Loading } from "../..";
import { transformTextField } from "../../../utils/helper_functions";
import {
	BACKEND_BASE_URL,
	USER_CREDENTIALS,
	getUserRegistrationConfirmationEmailRoute,
} from "../../../utils/constant";
import { useInitalAddMutation } from "../../../api/orderApi";
import axios from "axios";

const LoginSuccess = ({ name }) => {
	return (
		<Stack
			sx={{
				width: "100vw",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Typography textAlign="center" variant="h4" color="primary">
				Welcome {name}, You Are Logged In
			</Typography>
		</Stack>
	);
};

/* TODO:
 * 1. something is wrong with the confirm password check, it is 80% working
 * 2.
 * 3.
 */
const CreateForm = ({
	formHeader, // the header of the form
	arrayOfTextFields, // array of text fields to display
	submitButton, // if true, show the submit button
	clearFormButton, // if true, show the clear form button
	formType, // either "login" or "register"
	...props // all other props
}) => {
	/* create the initial form state from the arrayOfTextFields prop
	 * the initial form state is an object with the text fields as keys
	 * and the values as empty strings
	 */
	const initialFormState = arrayOfTextFields.reduce((acc, textField) => {
		acc[transformTextField(textField)] = "";
		return acc;
	}, {});
	// create state to hold the form data
	const [formData, setFormData] = useState(initialFormState);

	/*  destructuring the token and user from the session storage
	 *  if the token and user are not in the session storage,
	 *  set the token to an empty string and user to and an empty object
	 */
	const { token, user } = JSON.parse(
		window.sessionStorage.getItem(USER_CREDENTIALS)
	) || { token: "", user: {} };

	/* create a state to hold the focused text field
	 * focusedField is used to determine if the clear icon should be shown
	 */
	const [focusedField, setFocusedField] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const currentLocation = location.pathname; // used to check if the user navigates to another page

	// get the mutation functions and the state of the mutation functions
	const [login, loginState] = useLoginMutation();
	const [register, registerState] = useRegisterMutation();

	//adds session cart into user cart
	const [cartData] = useInitalAddMutation();

	// return the correct mutation function and correct state depending on formType
	function getMutationFunctionAndState(formType) {
		switch (formType) {
			case "login": {
				const { isLoading, isError, error } = loginState;
				return { mutationFunction: login, isLoading, isError, error };
			}
			case "register": {
				const { isLoading, isError, error } = registerState;
				return {
					mutationFunction: register,
					isLoading,
					isError,
					error,
				};
			}
			default:
				throw new Error(
					`Invalid formType: ${formType}, Can't Create Form`
				);
		}
	}

	// destructure the mutation function and the state of the mutation function
	const { mutationFunction, isLoading, isError, error } =
		getMutationFunctionAndState(formType);

	// calls the mutation function when the form is submitted
	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error } = await mutationFunction(formData);

		// TODO: convert this into redux toolkit query later, also make it only work after successful registration
		const data = await axios.post(
			`${BACKEND_BASE_URL}${getUserRegistrationConfirmationEmailRoute()}`,
			{
				from: "shaqmandy@resend.dev", // might need to change this to "onboarding@resend.dev"
				to: formData.username,
				subject: "Welcome to the M.A.S Fruit Market",
				html: `<p>Thank you for registering with us, ${formData.firstname} ${formData.lastname}! We hope you enjoy your shopping experience with us.</p>`,
			}
		);

		console.log("registration email data", data);

		if (!error && window.sessionStorage.cart) {
			const data = Object.values(JSON.parse(window.sessionStorage.cart));

			// {cart:[{productid,quantity},{productid,quantity}, {productid,quantity}]} needs to be sent in this format to backend
			const cart = data.map((item) => {
				return { productid: item.id, quantity: item.quantity };
			});

			cartData(cart);

			// clear cart session
			window.sessionStorage.removeItem("cart");
		}
		handleClearForm(); // clear the form after submitting
	};

	// clear the form when the clear button is clicked
	const handleClearForm = () => {
		setFormData(initialFormState);
	};

	const [passwordsMatch, setPasswordsMatch] = useState(true);
	// enhanced onChangeHandler to check if the confirm password matches the password
	const onChangeHandler = (event, textfield) => {
		const value = event.target.value;
		setFormData({
			...formData,
			[transformTextField(textfield)]: value,
		});

		// check if the confirm password matches the password for the register form
		if (textfield === "confirmpassword" && value !== formData.password) {
			setPasswordsMatch(false);
		} else {
			setPasswordsMatch(true);
		}
	};

	/*  if the user is still on the login page for 4 seconds after logging in, redirect to home page
	 *  else if the user navigates to another page in less than 4 seconds, do nothing
	 */
	useEffect(() => {
		if (token) {
			const timer = setTimeout(() => {
				if (location.pathname === currentLocation) {
					navigate("/products");
				}
			}, 4000);

			// Cleanup function to clear the timeout when the component unmounts
			return () => clearTimeout(timer);
		}
	}, [currentLocation, location.pathname, navigate, token]);

	if (isLoading) {
		return <Loading isLoading={isLoading} />;
	} else if (token) {
		const name = `${user.firstname} ${user.lastname}`;
		return <LoginSuccess name={name} />;
	} else {
		return (
			// Stack that centers the form in the middle of the page
			<Stack
				sx={{
					width: "100%",
					height: "100vh",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{/* Paper container for the entire form. Height and width can be modified through props  */}
				<Paper
					elevation={3}
					component="form"
					onSubmit={handleSubmit}
					sx={{
						p: 2,
						mt: 2,
						display: "flex",
						flexDirection: "column",
						gap: 2,
						width: props.width
							? props.width
							: { xs: 250, sm: 500, md: 800 },
						height:
							props.height && arrayOfTextFields.length < 5
								? props.height
								: "auto",
						justifyContent: "center",
					}}
				>
					{/* Header For The Form */}
					<Typography textAlign="center" variant="h4" color="primary">
						{formHeader}
					</Typography>

					{/* Text Fields For The Form */}
					{arrayOfTextFields.map((textfield) => {
						const transformedTextField =
							transformTextField(textfield);
						return (
							<TextField
								key={textfield}
								id={transformedTextField}
								label={textfield}
								required
								value={formData[transformedTextField]}
								placeholder={`Type Your ${textfield} Here`}
								type={
									transformedTextField === "password" ||
									transformedTextField === "confirmpassword"
										? "password"
										: "text"
								}
								onChange={(event) =>
									onChangeHandler(event, transformedTextField)
								}
								onFocus={() =>
									setFocusedField(transformedTextField)
								}
								// adds the clear icon to the textfield
								InputProps={{
									endAdornment:
										// only show the clear icon if the textfield is focused and the textfield is not empty
										focusedField === transformedTextField &&
											formData[transformedTextField] !==
												"" && (
												<InputAdornment position="end">
													<Tooltip
														title={`Clear ${textfield}`}
													>
														<IconButton
															onClick={() =>
																setFormData({
																	...formData,
																	[transformedTextField]:
																		"",
																})
															}
														>
															<ClearIcon color="primary" />
														</IconButton>
													</Tooltip>
												</InputAdornment>
											),
								}}
								sx={{
									width: "90%",
									ml: "auto",
									mr: "auto",
								}}
							/>
						);
					})}

					{/* Passwords Do Not Match Error Message */}
					{!passwordsMatch && formData?.confirmpassword && (
						<Typography
							color="error"
							variant="body2"
							textAlign="center"
						>
							Passwords Do Not Match
						</Typography>
					)}

					{/* Submit and Clear Buttons Render Conditionally Based On Props */}
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							placeItems: { xs: "center", md: "normal" },
							justifyContent: { md: "center" },
						}}
						gap={1}
					>
						{clearFormButton && (
							<Button
								variant="contained"
								color="primary"
								sx={{
									mb: { xs: 0, md: 2 },
									width: { xs: "90%", md: "45%" },
									":hover": { bgcolor: "primary.dark" },
								}}
								onClick={handleClearForm}
							>
								Clear Form
							</Button>
						)}
						{submitButton && (
							<Button
								variant="contained"
								type="submit"
								color="primary"
								sx={{
									mb: { xs: 0, md: 2 },
									width: { xs: "90%", md: "45%" },
									":hover": { bgcolor: "primary.dark" },
								}}
							>
								Submit
							</Button>
						)}
					</Box>

					{/* Error Message Renders If An Error Is Returned From The Backend */}
					{isError && <Error error={error} height="auto" />}
				</Paper>
			</Stack>
		);
	}
};

export default CreateForm;
