// Login.js
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { authContext } from "../Context/AuthContextProvider";
import styles from "../sharedStyles/loginAndRegister.module.css";
import { Helmet } from "react-helmet-async";
// Constants
const API_URL = "https://ecommerce.routemisr.com/api/v1/auth/signin";
const validationMessages = {
  required: "This field is required",
  invalidEmail: "Please enter a valid email",
  passwordMismatch: "Passwords must match",
};

// Main Login Component
function Login() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // useContext
  const { setToken } = useContext(authContext);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(validationMessages.required)
      .email(validationMessages.invalidEmail),
    password: Yup.string()
      .required(validationMessages.required)
      .min(6, "Password must be at least 6 characters"),
  });

  // API Call Function
  function sendUserData(values) {
    setIsLoading(true);
    axios
      .post(API_URL, values)
      .then(function (response) {
        setToken(response.data.token);
        localStorage.setItem("tkn", response.data.token);
        localStorage.setItem("userName", response?.data?.user?.name);
        localStorage.setItem("userEmail", response?.data?.user?.email);

        setIsSuccess(true);
        setErrorMessage("");

        setTimeout(function () {
          navigate("/");
          formik.resetForm();
        }, 2000);
      })
      .catch(function (error) {
        if (error.response) {
          setErrorMessage("Incorrect email or password");
        } else {
          setErrorMessage("Network error. Please try again later.");
        }
      })
      .finally(function () {
        setIsLoading(false);
      });
  }

  // Formik Initialization
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: sendUserData,
  });

  return (
    <>
      {/* --------------------------Helmet--------------------- */}
      <Helmet>
        <title>Login - FreshCart</title>
        <meta
          name="description"
          content="Sign in to your FreshCart account to start shopping, view your orders, and manage your personal information."
        />
      </Helmet>
      {/* -------------------------- Body --------------------- */}

      <div className={`d-flex flex-column align-items-center  `}>
        <div className={`my-md-5 my-0  container `}>
          <div className="row justify-content-center">
            <div className={`col-lg-8 col-12  `}>
              <LoginForm
                onSubmit={formik.handleSubmit}
                values={formik.values}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
                isLoading={isLoading}
                //these props for the alerts
                isSuccess={isSuccess}
                errorMessage={errorMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
