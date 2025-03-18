import { Helmet } from "react-helmet-async"; // For managing document head (title, meta tags)
import useRegisterForm from "../hooks/useRegisterForm"; // Custom hook for form logic
import RegisterForm from "../RegisterForm/RegisterForm"; // Form component

function Register() {
  // Destructure values from the custom hook
  const { formik, isSuccess, errorMessage, isLoading } = useRegisterForm();

  return (
    <>
      {/* -------------------------- Helmet --------------------- */}
      <Helmet>
        <title>Register - FreshCart</title>
        <meta
          name="description"
          content="Create a new account on FreshCart to start shopping, track your orders, and enjoy exclusive offers."
        />
      </Helmet>

      {/* -------------------------- Body --------------------- */}
      <div className={`d-flex flex-column align-items-center`}>
        <div className={`container my-5`}>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              {/* Success message after account creation */}
              {isSuccess && (
                <div className="alert alert-success text-center">
                  Account created successfully
                </div>
              )}

              {/* Error message if registration fails */}
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}

              {/* Render the registration form */}
              <RegisterForm formik={formik} isLoading={isLoading} />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
