import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/products/Products";
import Product from "./components/products/product/Product";

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
