import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Products,
	Product,
	NavBar,
	Logout,
	LoginForm,
	RegisterForm,
} from "./components";

function App() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route index element={<Products />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</Router>
	);
}

export default App;
