import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Products, Product } from "./components";

function App() {
	return (
		<Router>
			<Routes>
				<Route index element={<Products />} />
				<Route path="/product/:id" element={<Product />} />
			</Routes>
		</Router>
	);
}

export default App;
