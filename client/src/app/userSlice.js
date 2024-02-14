import { createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi"; // HAVE TO IMPORT userApi HERE and NOT api!!!

// session storage key
const USER_CREDENTIALS = "user_credentials";

// callback function to store user and token in session storage and state
function storeUserAndToken(state, action) {
	state.token = action.payload.token;
	state.user = { ...action.payload.user };

	window.sessionStorage.setItem(
		USER_CREDENTIALS,
		JSON.stringify({
			token: action.payload.token,
			user: { ...action.payload.user },
		})
	);
}

const initialState = {
	token: "",
	user: {},
};

const userSlice = createSlice({
	name: "user",
	initialState:
		JSON.parse(window.sessionStorage.getItem(USER_CREDENTIALS)) ||
		initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			userApi.endpoints.getProfile.matchFulfilled,
			(state, action) => {
				state.user = action.payload.user;
			}
		);
		builder.addMatcher(
			userApi.endpoints.register.matchFulfilled,
			storeUserAndToken
		);
		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			storeUserAndToken
		);
		builder.addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
			state.token = "";
			state.user = {};
			window.sessionStorage.removeItem(USER_CREDENTIALS);
		});
	},
});

export default userSlice.reducer;