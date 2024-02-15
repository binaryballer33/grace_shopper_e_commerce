import CreateForm from "../create_form/CreateForm";

const LoginForm = () => (
	<CreateForm
		formHeader="Sign In"
		arrayOfTextFields={["Username", "Password"]}
		formType="login"
		submitButton={true}
		clearFormButton={true}
		width={{ xs: "80%", md: "45%" }}
		height={{ xs: "auto", md: 550 }}
	/>
);

export default LoginForm;
