import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import { Helmet } from "react-helmet-async";

function Products() {
  // Fetch products data from the API
  function fetchData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, isError, error } = useQuery(
    "getAllProducts",
    fetchData
  );
  // Destructure the products array from the API response
  const product = data?.data?.data;

  // Display a loader while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Display an error message if the API request fails
  if (isError) {
    return <div className="text-center mt-5">Error:{error.message}</div>;
  }

  return (
    <>
      {/* Helmet  */}
      <Helmet>
        <title> FreshCart - All Products </title>
        <meta
          name="description"
          content="Explore a wide range of high-quality products at FreshCart. Find the best deals on electronics, fashion, home essentials, and more."
        />
      </Helmet>
      {/* Page Content */}
      <div className={`container my-5`}>
        <h1 className="text-center mb-4 mb-md-5 text-uppercase">Products</h1>

        {/* Render the ProductCard component with the fetched products */}
        <ProductCard product={product} />
      </div>
    </>
  );
}

export default Products;
