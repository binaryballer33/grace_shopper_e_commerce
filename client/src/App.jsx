import { Stack, Typography } from "@mui/material";
import "./App.css";

function App() {
	return (
		<Stack
			sx={{
				alignItems: "center",
				justifyContent: "center",
				height: "99vh",
				width: "100vw",
			}}
		>
			<Typography variant="h4" color="primary" mt={3}>
				Hello World
			</Typography>
		</Stack>
	);
}

export default App;
