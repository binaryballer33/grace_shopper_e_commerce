/* ROUTE CONSTANTS
 * should have in your .env file a
 * VITE_DEVELOPMENT_BACKEND_BASE_URL,
 * VITE_PRODUCTION_BACKEND_BASE_URL,
 * VITE_PORT,
 * DATABASE_URL
 * env variables
 */

// backend base url for development and production
export const BACKEND_BASE_URL = import.meta.env.DEV
	? import.meta.env.VITE_DEVELOPMENT_BACKEND_BASE_URL
	: import.meta.env.VITE_PRODUCTION_BACKEND_BASE_URL;

/* PRODUCT ROUTES */

export function getAllProductsRoute() {
	return "/products";
}

export function getProductByIdRoute(id) {
	return `/products/product/${id}`;
}

export function getCreateProductRoute() {
	return "/products/create/";
}

export function getUpdateProductRoute(id) {
	return `/products/update/${id}`;
}

export function getRemoveProductRoute(id) {
	return `/products/delete/${id}`;
}

/* USER ROUTES */

export function getAllUsersRoute() {
	return "/user/";
}

export function getUserRegisterRoute() {
	return "/user/register/";
}

export function getUserLoginRoute() {
	return "/user/login";
}

export function getUserProfileRoute() {
	return "/user/profile";
}
