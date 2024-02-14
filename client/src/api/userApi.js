import {
	getUserRegisterRoute,
	getUserLoginRoute,
	getUserProfileRoute,
} from "../utils/constant";
import api from "./api";

// product api endpoints
const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		// user endpoints
		getProfile: builder.query({
			query: () => getUserProfileRoute(),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: getUserRegisterRoute(),
				method: "POST",
				body: credentials,
			}),
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: getUserLoginRoute(),
				method: "POST",
				body: credentials,
			}),
		}),
		logout: builder.mutation({
			queryFn: () => ({ data: {} }),
		}),
	}),
});

// HAVE TO EXPORT userApi IN ORDER FOR extraReducers TO WORK IN THE userSlice.js
export default userApi;

export const {
	useGetProfileQuery,
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
} = userApi;
