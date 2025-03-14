import React, { useContext, useState } from "react";
import { cartContext } from "../CartContextProvider/CartContextProvider";
import { FallingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { wishlistContext } from "../WishlistContextProvider/WishlistContextProvider";

function AddToCartButton({ productId, className }) {
  // Access cart context to add products to the cart
  const { addProductToCart } = useContext(cartContext);

  // State to manage loading state while adding to cart
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if the user is logged in by checking the token in localStorage
  const isLoggedIn = localStorage.getItem("tkn");

  // Access wishlist context to remove products from the wishlist
  const { removeProductFromWishlist } = useContext(wishlistContext);

  // Function to handle adding a product to the cart
  async function handleAddToCart() {
    // If user is not logged in, show an error toast and return early
    if (!isLoggedIn) {
      toast.error("Please log in to add items to your cart.", {
        icon: "🔒",
        style: {
          color: "#c62828",
          borderRadius: "8px",
        },
      });
      return;
    }

    // Set loading state to true while adding to cart
    setIsAddingToCart(true);
    try {
      // Add the product to the cart
      await addProductToCart(productId);

      // Remove the product from the wishlist after adding to cart
      await removeProductFromWishlist(productId);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      // Reset loading state regardless of success or failure
      setIsAddingToCart(false);
    }
  }

  return (
    <button
      aria-label="Add to cart" // Accessibility label for screen readers
      onClick={handleAddToCart} // Trigger handleAddToCart on button click
      className={`btn btn-dark py-2 ${className} flex-grow-1 w-100`} // Dynamic class names
      disabled={isAddingToCart} // Disable button while adding to cart
    >
      {isAddingToCart ? (
        // Show loading spinner and text while adding to cart
        <div>
          Adding{" "}
          <FallingLines
            color="#fff"
            width="20"
            visible={true}
            ariaLabel="Loading"
          />
        </div>
      ) : (
        // Show "Add to cart" text and icon when not loading
        <div>
          {" "}
          <i className="fas fa-cart-plus me-2"></i>
          Add
        </div>
      )}
    </button>
  );
}

export default React.memo(AddToCartButton);
