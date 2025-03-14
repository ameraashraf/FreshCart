import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import NoDataMessage from "../NoDataMesssage/NoDataMessage";
import { Helmet } from "react-helmet-async";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function ProductsByFilter({ filterType }) {
  // Extract ID and name from the URL parameters
  const { id, name } = useParams();
  const decodeName = decodeURIComponent(name); // Decode name to handle special characters

  // Determine the API filter parameter based on filterType
  const filterParam = filterType === "category" ? "category[in]" : "brand";

  // Function to fetch products from the API
  async function FetchData() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,
        {
          params: { [filterParam]: id }, // Dynamically set filter parameter
        }
      );
      return response?.data?.data;
    } catch (error) {
      console.error(error); // Log errors for debugging
      throw new Error(error.response?.data?.message || "Failed to fetch data");
    }
  }

  // Fetch and manage data using react-query
  const { data, isLoading, isError, isFetching, error } = useQuery(
    [`FetchDataForProducts`, filterType, id], // Unique key to avoid caching issues
    FetchData
  );

  // Show a loader while fetching data
  if (isLoading || isFetching) return <Loader />;

  // Show an error message if data fetching fails
  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      {/* Helmet for SEO optimization */}
      <Helmet>
        <title>{`${decodeName} Products - FreshCart`}</title>
        <meta
          name="description"
          content={`Discover more about ${decodeName} products at FreshCart. Check out detailed specifications, features, and customer reviews. Shop now for the best price!`}
        />
      </Helmet>

      {/* Page Content */}
      <div className="container my-5">
        {/* Display category/brand name */}
        <h2 className="text-center mb-3 mb-md-4 text-uppercase">
          {decodeName}
        </h2>

        {/* Show product list or "No Data" message if no products exist */}
        {data.length > 0 ? (
          <ProductCard product={data} /> // Render ProductCard component
        ) : (
          <NoDataMessage
            heading={`No products found for this ${filterType}.`}
          />
        )}
      </div>
    </>
  );
}

export default ProductsByFilter;
