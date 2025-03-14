import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import OrderList from "../OrderList/OrderList";
import { Helmet } from "react-helmet-async";
import NoDataMessage from "../NoDataMesssage/NoDataMessage";
import { ErrorMessage } from "formik";

function AllOrders() {
  // Get userId from local storage. This is used to fetch orders specific to the user.
  const userId = localStorage.getItem("userId");

  // Function to fetch user orders from the API
  async function getUserOrders() {
    console.log("userId", userId); // Log userId for debugging purposes

    // Check if userId is available. If not, throw an error.
    if (!userId) {
      throw new Error("User ID is not available in local storage.");
    }

    // Make a GET request to the API to fetch orders for the specific user
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );

    // Return the fetched data
    return response.data;
  }

  // Use React Query to manage the data fetching process
  const {
    data: orders, // The fetched orders data
    isLoading, // Boolean indicating if the data is still loading
    isError, // Boolean indicating if an error occurred during fetching
    error, // The error object, if an error occurred
  } = useQuery("getUserOrders", getUserOrders);

  // Display a loader while the data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Display an error message if the data fetching fails
  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      {/* Use Helmet to manage the document head (SEO and meta tags) */}
      <Helmet>
        <title>My Orders - FreshCart</title>
        <meta
          name="description"
          content="View your order history, track your shipments, and manage your purchases easily on FreshCart."
        />
      </Helmet>

      {/* Main container for the orders page */}
      <div className="container py-5">
        {/* Page heading */}
        <h1 className="text-center mb-4 mb-md-5 text-uppercase">All orders</h1>

        {/* Conditional rendering based on whether orders exist */}
        {orders.length ? (
          // If orders exist, render the OrderList component
          <OrderList orders={orders} />
        ) : (
          // If no orders exist, render the NoDataMessage component
          <NoDataMessage
            heading={"You don't have any orders yet. "}
            paragraph={"Start shopping now and enjoy great deals!"}
          />
        )}
      </div>
    </>
  );
}

export default AllOrders;
