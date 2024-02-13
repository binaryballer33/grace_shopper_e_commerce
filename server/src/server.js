import productRouter from "./api/product.js";
import userRouter from "./api/user.js";
import app from "./app.js";
import { errorHandler } from "./middleware/middleware.js";

// can still use process.env on the server side, but need to use import.meta.env on the client side
// eslint-disable-next-line no-undef
const PORT = process.env.VITE_PORT;

// Backend routes
app.use("/user", userRouter);
app.use("/products", productRouter);

// Error handling middleware, make sure it's the last middleware added
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server Up Listening On Port ${PORT}...`);
});
