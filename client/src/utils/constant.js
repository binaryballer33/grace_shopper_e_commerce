/* ROUTE CONSTANTS
 * should have in your .env file a
 * VITE_DEVELOPMENT_BACKEND_BASE_URL,
 * VITE_PRODUCTION_BACKEND_BASE_URL,
 * VITE_PORT,
 * DATABASE_URL
 * env variables
 */

// session storage key
export const USER_CREDENTIALS = "user_credentials";

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

export function getInCartRoute() {
  return "/cart/incart";
}

export function getCheckoutOrderRoute() {
  return "/cart/checkout";
}

export function getCancelOrderRotue() {
  return "/cart/cancel";
}

export function getRemoveItemRoute() {
  return "/cart/delete";
}

export function getIncreaseCountRoute() {
  return "/cart/updateUp";
}

export function getDecreaseCountRoute() {
  return "/cart/updateDown";
}

export function getAddToCartRoute() {
  return "/cart/add";
}

export function getInitialAddRoute() {
  return "/cart/addCart";
}
