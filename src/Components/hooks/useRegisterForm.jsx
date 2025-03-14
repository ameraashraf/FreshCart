import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { RegisterValidationSchema } from "../../schemas/validationSchemas";

const API_URL = "https://ecommerce.routemisr.com/api/v1/auth/signup"; // API endpoint for registration

function useRegisterForm() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Mutation for handling form submission and API call
  const mutation = useMutation({
    mutationFn: function (values) {
      return axios.post(API_URL, values); // POST request to register user
    },
    onSuccess: function (response) {
      console.log(response.data); // Log successful response
      setTimeout(function () {
        navigate("/Login"); // Redirect to login page after 2 seconds
      }, 2000);
    },
    onError: function (error) {
      if (error.response) {
        console.error(error.response.data.message || "Something went wrong."); // Log API error message
      } else {
        console.error("Network error. Please try again later."); // Log network error
      }
    },
  });

  // Formik initialization for form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: RegisterValidationSchema, // Yup validation schema
    onSubmit: function (values) {
      mutation.mutate(values); // Trigger mutation on form submission
    },
  });

  // Return formik instance and mutation state for use in components
  return {
    formik: formik,
    isLoading: mutation.isPending, // Loading state during mutation
    errorMessage: mutation.error ? mutation.error.message : "", // Error message if mutation fails
    isSuccess: mutation.isSuccess, // Success state after mutation
  };
}

export default useRegisterForm;