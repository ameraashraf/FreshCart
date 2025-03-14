import { useContext } from "react";
import Loader from "../Loader/Loader";
import { wishlistContext } from "../WishlistContextProvider/WishlistContextProvider";
import { useQuery } from "react-query";
import ProductCard from "../ProductCard/ProductCard";
import { Helmet } from "react-helmet-async";
import NoDataMessage from "../NoDataMesssage/NoDataMessage";

function WishList() {
  const { fetchUserWishlist } = useContext(wishlistContext); // Accessing the fetchUserWishlist function from context

  const { data, isLoading, isError, error } = useQuery(
    "fetchUserWishlist", // Unique query key for react-query
    fetchUserWishlist // Function to fetch wishlist data
  );

  if (isLoading) {
    return <Loader />; // Show loader while data is loading
  }

  if (!data) {
    return <Loader />; // Show loader if there's no data (edge case)
  }

  if (isError) {
    return <div className="text-center"> Error: {error.message}</div>; // Display error message if fetching fails
  }

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Wishlist - FreshCart</title>
        <meta
          name="description"
          content="Save your favorite products in your wishlist at FreshCart. Keep track of the items you love and shop them anytime!"
        />
      </Helmet>
      <div className={`container my-5 `}>
        <h1 className="text-center mb-4 mb-md-4 text-uppercase">WishList</h1>

        {data.length ? (
          <ProductCard product={data} /> // Display wishlist items if available
        ) : (
          <NoDataMessage
            heading={"Your wishList is empty."}
            paragraph={`Start adding products to your wishlist.`}
          /> // Show message if wishlist is empty
        )}
      </div>
    </>
  );
}

export default WishList;
