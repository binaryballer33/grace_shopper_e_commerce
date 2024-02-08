import productRouter from "./api/product.js";
import userRouter from "./api/user.js";
import app from "./app.js";
import { errorHandler } from "./middleware/middleware.js";

const PORT = 3000;

// Backend routes
app.use("/user", userRouter);
app.use("/product", productRouter);

// Error handling middleware, make sure it's the last middleware added
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
