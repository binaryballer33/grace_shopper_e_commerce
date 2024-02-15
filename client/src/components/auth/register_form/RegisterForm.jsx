import CreateForm from "../create_form/CreateForm";

const RegisterForm = () => (
	<CreateForm
		formHeader="Create An Account"
		arrayOfTextFields={[
			"First Name",
			"Last Name",
			"Username",
			"Password",
			"Confirm Password",
		]}
		formType="register"
		submitButton={true}
		clearFormButton={true}
		width={{ xs: "80%", md: "45%" }}
		height={{ xs: "auto", md: 550 }}
	/>
);

export default RegisterForm;
