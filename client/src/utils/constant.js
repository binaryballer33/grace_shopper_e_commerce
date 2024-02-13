/* ROUTE CONSTANTS
 * should have in your .env file a
 * VITE_DEVELOPMENT_BACKEND_BASE_URL,
 * VITE_PRODUCTION_BACKEND_BASE_URL,
 * VITE_PORT,
 * DATABASE_URL
 * env variables
 */

// backend base url for development and production
const BACKEND_BASE_URL = import.meta.env.DEV
	? import.meta.env.VITE_DEVELOPMENT_BACKEND_BASE_URL
	: import.meta.env.VITE_PRODUCTION_BACKEND_BASE_URL;

export function getAllProductsRoute() {
	return `${BACKEND_BASE_URL}/products`;
}

export function getProductByIdRoute(id) {
	return `${BACKEND_BASE_URL}/products/product/${id}`;
}
