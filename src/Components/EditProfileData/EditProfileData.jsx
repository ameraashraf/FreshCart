import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { DevTool } from "@hookform/devtools";
import { profileValidationSchema } from "../../schemas/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext } from "react";
import { authContext } from "../Context/AuthContextProvider";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

function EditProfileData({ handleOnClick }) {
  const { token } = useContext(authContext); // Get authentication token from context

  // Initialize form with Yup validation and default values
  const myForm = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: {
      name: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      phone: "01157611021", // Consider making this dynamic
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = myForm;

  // API call to update user data
  async function updateUserData(data) {
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        { name: data.name, email: data.email, phone: data.phone },
        { headers: { token } } // Include token in headers
      );
      return response.data.user;
    } catch (error) {
      throw new Error(
        error.response?.data?.errors.msg || "Failed to update profile"
      );
    }
  }

  // Handle form submission
  function onSubmit(data) {
    mutation.mutate(data); // Trigger mutation to update data
  }

  // Mutation to handle API call and side effects
  const mutation = useMutation(updateUserData, {
    onSuccess: (response) => {
      localStorage.setItem("userName", response.name); // Update localStorage
      localStorage.setItem("userEmail", response.email);
      toast.success("Profile updated successfully!");
      handleOnClick();
    },
    onError: (error) => toast.error(error.message), // Show error message
  });

  return (
    <div className="col-md-8">
      <div className="textInfo mb-3">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="userName" className="form-label fw-bold">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-danger mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold"
            >
              Phone number:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-danger mt-1">{errors.phone.message}</p>
            )}
          </div>

          <Button text={"Save changes"} className="bg-dark text-white" />
          <Button
            text={"Cancel"}
            handleOnClick={handleOnClick}
            className="btn-outline-danger btn"
          />
        </form>
        <DevTool control={control} /> {/* DevTool for debugging form state */}
      </div>
    </div>
  );
}

export default EditProfileData;
