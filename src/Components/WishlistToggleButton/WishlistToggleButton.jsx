import { useMutation, useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../Context/AuthContextProvider";
import toast from "react-hot-toast";
import { wishlistContext } from "../WishlistContextProvider/WishlistContextProvider";

function WishlistToggleButton({ productId, styles }) {
  const { token } = useContext(authContext); // Access the token from auth context
  const { fetchUserWishlist, addToWishlist, removeProductFromWishlist } =
    useContext(wishlistContext); // Access wishlist functions from context
  const [isAdded, setIsAdded] = useState(false); // Track if product is in wishlist
  const isLoggedIn = !!token; // Check if user is logged in

  // useMutation hook for adding product to wishlist
  const { mutate: addMutate, isLoading: isAdding } = useMutation(addToWishlist, {
    onSuccess: function () {
      setIsAdded(true); // Mark product as added
      toast.success("Product added to wishlist!");
    },
    onError: function () {
      toast.error("Failed to add to wishlist. Please try again.");
    },
  });

  // useQuery hook to fetch user's wishlist
  const { data: wishlistProducts } = useQuery(
    `fetchUserWishList`,
    fetchUserWishlist,
    { enabled: isLoggedIn }
  );

  // useEffect to check if product is already in the wishlist
  useEffect(() => {
    if (wishlistProducts) {
      const foundProduct = wishlistProducts.filter(function (item) {
        return item._id === productId;
      });

      if (foundProduct.length > 0) {
        setIsAdded(true); // Product found in wishlist
      }
    }
  }, [wishlistProducts, productId]);

  // useMutation hook for removing product from wishlist
  const { mutate: removeMutate, isLoading: isRemoving } = useMutation(
    removeProductFromWishlist,
    {
      onSuccess: function () {
        setIsAdded(false); // Mark product as removed
        toast.success("Product removed from wishlist!");
      },
      onError: function () {
        toast.error("Failed to remove product. Please try again.");
      },
    }
  );

  return (
    <div>
      <button
        className={`${styles}`}
        aria-label="Add to favourites"
        onClick={() => {
          if (isAdded) {
            removeMutate(productId); // Remove from wishlist if already added
          } else {
            addMutate(productId); // Add to wishlist if not added
          }
        }}
        disabled={isAdding || isRemoving} // Disable button while loading
      >
        {isAdded ? (
          <i className="fa-solid fa-heart text-danger"></i> // Heart icon for added items
        ) : (
          <i className="far fa-heart"></i> // Heart icon for non-added items
        )}
      </button>
    </div>
  );
}

export default WishlistToggleButton;
