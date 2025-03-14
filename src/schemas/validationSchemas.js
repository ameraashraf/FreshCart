import * as Yup from "yup";

// Validation error messages for reuse across schemas
const validationMessages = {
  required: "This field is required",
  invalidEmail: "Please enter a valid email",
  phonePattern: "Invalid phone number",
  passwordMismatch: "Passwords must match",
};

// Schema for user registration validation
export const RegisterValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces") // Allow only letters and spaces
    .min(3, "Name must be at least 3 characters") // Minimum length
    .max(50, "Name must be at most 50 characters") // Maximum length
    .required(validationMessages.required), // Field is required

  email: Yup.string()
    .email(validationMessages.invalidEmail) // Validate email format
    .required(validationMessages.required), // Field is required

  phone: Yup.string()
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, validationMessages.phonePattern) // Validate phone number format
    .required(validationMessages.required), // Field is required

  password: Yup.string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Require uppercase
    .matches(/[a-z]/, "Password must contain at least one lowercase letter") // Require lowercase
    .matches(/\d/, "Password must contain at least one number") // Require a number
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character" // Require a special character
    )
    .min(8, "Password must be at least 8 characters") // Minimum length
    .required(validationMessages.required), // Field is required

  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], validationMessages.passwordMismatch) // Ensure passwords match
    .required(validationMessages.required), // Field is required
});

// Schema for profile validation (reuses fields from RegisterValidationSchema)
export const profileValidationSchema = Yup.object({
  name: RegisterValidationSchema.fields.name, // Reuse name validation
  email: RegisterValidationSchema.fields.email, // Reuse email validation
  phone: RegisterValidationSchema.fields.phone, // Reuse phone validation
});
