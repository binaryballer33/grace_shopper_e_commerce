import jwt from "jsonwebtoken";

// keep req and next as an argument even if it's not used to avoid errors
export const errorHandler = (err, _req, res, _next) => {
	console.error(err.stack); // Log error stack to console

	res.status(500).send({
		status: 500,
		message: err.message,
		body: {},
	});
};

// verify token provided
export const verifyToken = (req, res, next) => {
	// extract token from headers
	const auth = req.headers.authorization;
	const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

	// if token is good add user to request
	try {
		req.user = jwt.verify(token, process.env.JWT);
	} catch {
		// if unable to verify user not logged in
		req.user = null;
	}
	next();
};
