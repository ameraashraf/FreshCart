import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../FormInput/FormInput";
import { useMutation } from "react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { cartContext } from "../CartContextProvider/CartContextProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
// Validation Schema
const validationSchema = Yup.object({
  city: Yup.string().required("City is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must be numeric")
    .required("Phone is required"),
  details: Yup.string(),
});

function Payment() {
  // useNavigate
  const navigate = useNavigate();

  // const [paymentMethod, setPaymentMethod] = useState("cash");

  // Handle form submission
  function handleSubmit(values) {
    if (values.paymentMethod === "cash") {
      cashMutation.mutate();
    } else {
      onlineMutation.mutate();
    }
  }

  const myFormik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
      paymentMethod: "cash",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  // Get the cart id from cart context
  const { cartId, getUserCart } = useContext(cartContext);

  // Function to call API to send the data
  async function confirmCashPayment() {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details: myFormik.values.details,
            phone: myFormik.values.phone,
            city: myFormik.values.city,
          },
        },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      // Update the cart with new values
      getUserCart();

      // return the data so onSucces & onError can use it
      return response.data.status;
    } catch (error) {
      //must throw an error here so onError method can work
      throw error;
    }
  }

  // Mutation hook to handle cash payment
  const cashMutation = useMutation(confirmCashPayment, {
    onError: function () {
      toast.error("An error occurred while processing your payment");
    },
    onSuccess: function () {
      //Clear the form.
      myFormik.resetForm();

      //Show the success message.
      toast.success("Cash payment done successfully");
      //Navigate to the Products page.

      setTimeout(function () {
        navigate("/products");
      }, 1500);
    },
  });

  async function confirmOnlinePayment() {
    try {
      // Call the API to initiate the payment session
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: {
            details: myFormik.values.details,
            phone: myFormik.values.phone,
            city: myFormik.values.city,
          },
        },
        {
          headers: { token: localStorage.getItem("tkn") },
          params: { URL: "http://localhost:3000" },
        }
      );

      const sessionUrl = response.data.session.url;

      // Notify the user that they are being redirected
      toast.loading(
        "Please wait, you are being directed to the payment page..."
      );

      // Delay redirection to allow the toast to be visible
      setTimeout(() => {
        window.open(sessionUrl, "_self");
      }, 2000);

      console.log("payment", response.data);

      // Return the data for useMutation (even if not needed here, for consistency)
      return response.data;
    } catch (error) {
      // Rethrow the error for useMutation's onError to handle
      throw error;
    }
  }

  // Mutation for online payment
  const onlineMutation = useMutation(confirmOnlinePayment, {
    onError: function () {
      // Display an error message if the payment process fails
      toast.error("Failed to initiate online payment");
    },
  });

  return (
    <div className="container  pt-3">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-12 ">
          <div
            className={` shadow rounded-3 pt-3 pb-5 px-3 bg-white my-md-5 my-0 `}
          >
            <form onSubmit={myFormik.handleSubmit}>
              <FormInput
                id="city"
                type="text"
                placeholder="Please write your city"
                value={myFormik.values.city}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                error={myFormik.errors.city}
                touched={myFormik.touched.city}
              />
              {/* -------------------------------------------------- */}
              <FormInput
                id="phone"
                type="tel"
                placeholder="Please write your phone"
                value={myFormik.values.phone}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                error={myFormik.errors.phone}
                touched={myFormik.touched.phone}
              />
              {/* -------------------------------------------------- */}
              <FormInput
                id="details"
                type="textarea"
                placeholder="message"
                value={myFormik.values.details}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
                error={myFormik.errors.details}
                touched={myFormik.touched.details}
              />

              <div className="d-flex align-items-center gap-3 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    id="cash"
                    checked={myFormik.values.paymentMethod === "cash"}
                    onChange={myFormik.handleChange}
                  />
                  <label className="form-check-label" htmlFor="cash">
                    Cash Payment
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    id="credit"
                    checked={myFormik.values.paymentMethod !== "cash"}
                    onChange={myFormik.handleChange}
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Online Payment
                  </label>
                </div>
              </div>

              <Button
                isLoading={cashMutation.isLoading || onlineMutation.isLoading}
                text={"Confirm payment"}
                type="submit"
                className="text-white bg-dark"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
