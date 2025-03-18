import FormInput from "../FormInput/FormInput"; // Importing custom form input component
import styles from "../sharedStyles/loginAndRegister.module.css"; // Importing custom styles
import Button from "../Button/Button"; // Importing button component
import { useNavigate } from "react-router-dom";

function RegisterForm({ formik, isLoading }) {
  const navigate = useNavigate();
  return (
    <div
      className={`shadow rounded-3 pt-3 px-3 bg-white my-md-5 my-0 ${styles.registerContent}`}
    >
      <h1 className="mb-4 text-center">Register</h1>
      {/* Form submission using formik */}
      <form onSubmit={formik.handleSubmit}>
        {/* Name input field */}
        <FormInput
          id="name"
          type="text"
          placeholder="write your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          touched={formik.touched.name}
        />
        {/* Email input field */}
        <FormInput
          id="email"
          type="email"
          placeholder="write your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        {/* Phone input field */}
        <FormInput
          id="phone"
          type="text"
          placeholder="write your phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />
        {/* Password input field */}
        <FormInput
          id="password"
          type="password"
          placeholder="write your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        {/* Re-password input field */}
        <FormInput
          id="rePassword"
          type="password"
          placeholder="re-enter your password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.rePassword}
          touched={formik.touched.rePassword}
        />
        {/* Submit button */}
        <Button
          isLoading={isLoading} // Show loading state on button
          text={"Register"} // Button text
          className="bg-dark text-white" // Button styles
        />
        <div role="button" tabIndex={0} onClick={() => navigate("/Login")}>
          <p className="mt-2">
            Already have an account? <span className="text-danger">Login</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
