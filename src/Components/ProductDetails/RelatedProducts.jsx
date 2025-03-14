import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";

function RelatedProducts({ categoryId }) {
  const enabled = categoryId !== undefined && categoryId !== null; // Check if categoryId exists

  // Function to fetch products in the same category
  async function fetchRelatedProductData() {
    const data = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products",
      {
        params: {
          "category[in]": categoryId,
        },
      }
    );
    return data;
  }

  // Use useQuery to fetch products in the same category
  const { data, isLoading, isError, error } = useQuery(
    `category-${categoryId}`, // Unique query key
    fetchRelatedProductData, // Fetch function
    { enabled: enabled }
  );

  // Display a loader while the data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Display an error message if the data fetching fails
  if (isError) {
    return (
      <div className="alert alert-danger">
        Error fetching related products: {error.message}
      </div>
    );
  }

  // Extract the products from the API response
  const relatedProducts = data?.data.data;

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      {/* <p className=" mt-5 text-center">{categoryId}</p> */}
      <h3 className=" mt-5 text-center mb-4 mb-md-5">Related products</h3>

      <ProductCard product={relatedProducts} />
    </div>
  );
}

export default RelatedProducts;
