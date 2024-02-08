// keep req and next as an argument even if it's not used to avoid errors
export const errorHandler = (err, _req, res, _next) => {
	console.error(err.stack); // Log error stack to console

	res.status(500).send({
		status: 500,
		message: err.message,
		body: {},
	});
};
