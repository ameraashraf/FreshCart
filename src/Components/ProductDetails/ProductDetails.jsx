import axios from "axios";
import { useQuery } from "react-query"; // Import useQuery for data fetching
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import Loader from "../Loader/Loader"; // Import the Loader component
import ProductDetailsLayout from "./ProductDetailsLayout";
import ProductImages from "../ProductImages/ProductImages";
import ProductInfo from "../ProductInfo/ProductInfo";
import RelatedProducts from "./RelatedProducts";
import styles from ".//ProductDetails.module.css";
import { Helmet } from "react-helmet-async";
// Main component for fetching and displaying product details
function ProductDetails() {
  // Access the addProductToCart function from the cart context

  // Get the product ID from the URL parameters
  const { id } = useParams();

  // Function to fetch product details from the API
  function fetchProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  // Use useQuery to fetch and manage the product details data
  const { data, isLoading, isError, error } = useQuery(
    `productDetails-${id}`, // Unique query key for caching
    fetchProductDetails // Function to fetch data
  );

  // Extract the product data from the API response
  const product = data?.data.data;
  const categoryId = product?.category?._id;

  // Display a loader while the data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Display an error message if the data fetching fails
  if (isError) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <p>{error.message}</p>
      </div>
    );
  }

  // Render the ProductDetailsContent component with the fetched product data
  return (
    <>
      {/* --------------------------Helmet--------------------- */}
      <Helmet>
        <title>{`${product.title} - FreshCart`}</title>
        <meta
          name="description"
          content={`Discover more about the ${product.name} at FreshCart. Check out detailed specifications, features, and customer reviews. Shop now for the best price!`}
        />
      </Helmet>
      ;{/* -------------------------- Body --------------------- */}
      <div className="">
        <ProductDetailsLayout>
          <div className={`container mt-3 mt-md-5  ${styles.productContainer}`}>
            <div className="row g-4">
              {/* Left column: Product images */}
              <ProductImages images={product.images} />
              {/* Right column: Product information */}
              <ProductInfo product={product} />
            </div>
          </div>
        </ProductDetailsLayout>
        <div className="my-5 container">
          <RelatedProducts categoryId={categoryId} />{" "}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
