import productRouter from "./api/product.js";
import userRouter from "./api/user.js";
import app from "./app.js";
import { errorHandler, verifyToken } from "./middleware/middleware.js";

const PORT = 3000;

// //verify token
// app.use(verifyToken);

// Backend routes
app.use("/user", userRouter);
app.use("/product", productRouter);

// Error handling middleware, make sure it's the last middleware added
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Up Listening On Port ${PORT}...`);
});
