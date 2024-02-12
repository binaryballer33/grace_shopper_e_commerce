import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/products/Products";

function App() {
	return (
		<Router>
			<Routes>
				<Route index element={<Products />} />
			</Routes>
		</Router>
	);
}

export default App;
