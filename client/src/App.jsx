import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Products,
	Product,
	NavBar,
	Logout,
	LoginForm,
	RegisterForm,
	Profile,
	Cart,
	LandingPage,
	Testimonials,
	Contact,
} from "./components";

function App() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="/testimonials" element={<Testimonials />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/products" element={<Products />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
