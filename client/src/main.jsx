import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#2f4f4f", // hex value for  darkslategray,
			light: "#708090", // hex value for  slategray,
			dark: "#213737",
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "darkslategray",
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				outlined: {
					"&.Mui-focused": {
						color: "darkslategray",
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: "darkslategray",
				},
			},
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
