import { Resend } from "resend";
import express from "express";

// instantiate the email send client and create the email router
const resend = new Resend(process.env.VITE_RESEND_API_KEY);
const emailRouter = express.Router();

// Create A New Purchase Confirmation Email
emailRouter.post("/puchaseEmail", async (req, res, next) => {
	const { from, to, subject, html } = req.body;
	try {
		// send the email
		await resend.emails.send({
			from,
			to,
			subject,
			html,
		});

		console.log("Req Body", req.body);

		// send the response back to the client
		res.status(200).send({
			message: "Successfully Sent Purchase Confirmation Email.",
		});
	} catch (error) {
		next(error);
	}
});

// Create A New Welcome After User Account Registration Email
emailRouter.post("/registrationEmail", async (req, res, next) => {
	try {
		// send the email
		// await resend.emails.send({
		// 	from: "onboarding@resend.dev",
		// 	to: "shaqmandy@gmail.com",
		// 	subject: "This Ya Boy Shaq Sending A Test Email",
		// 	html: "<h1>Yurrrrrrrrrrrrr</h1>",
		// });

		// send the email
		await resend.emails.send({
			from: "shaqmandy@resend.dev",
			to: req.body.to,
			subject: req.body.subject,
			html: req.body.html,
		});

		// send the response back to the client
		res.status(200).send({
			message:
				"Successfully Sent Welcome After User Account Registration Email.",
		});
	} catch (error) {
		next(error);
	}
});

export default emailRouter;
