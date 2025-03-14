import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "../Context/AuthContextProvider";
import toast from "react-hot-toast";
import axios from "axios";

export const wishlistContext = createContext();

function WishlistContextProvider({ children }) {
  const { token } = useContext(authContext); // Accessing the token from authContext
  const [itemsCount, setItemsCount] = useState(""); // State to store the count of wishlist items
  const isLoggedIn = !!token; // Check if the user is logged in

  // Function to add a product to the wishlist
  async function addToWishlist(productId) {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to your wish list.", {
        icon: "🔒",
      });
      return;
    }

    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers: { token },
        }
      );

      fetchUserWishlist(); // Re-fetch wishlist after adding item

      return response?.data?.data; // Return the added product's data
    } catch (error) {
      console.log("errorrrrs", error); // Log any errors
    }
  }

  // Function to remove a product from the wishlist
  async function removeProductFromWishlist(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token },
        }
      );
      fetchUserWishlist(); // Re-fetch wishlist after removing item
      return response?.data?.data; // Return the removed product's data
    } catch (error) {
      console.log(error); // Log errors
      throw error; // Throw error for mutation handlers to catch
    }
  }

  // Function to fetch the user's wishlist
  async function fetchUserWishlist() {
    try {
      if (!isLoggedIn) {
        toast.error("Please log in to add items to your wish list.", {
          icon: "🔒",
        });
        return;
      }

      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: { token },
        }
      );
      setItemsCount(response?.data?.count); // Update the item count in the state
      return response?.data?.data; // Return wishlist data
    } catch (error) {
      console.log(error); // Log any errors
    }
  }

  useEffect(() => {
    fetchUserWishlist(); // Fetch wishlist on component mount
  }, []); 

  return (
    <wishlistContext.Provider
      value={{
        fetchUserWishlist,
        addToWishlist,
        removeProductFromWishlist,
        itemsCount,
      }}
    >
      {children} {/* Render children components */}
    </wishlistContext.Provider>
  );
}

export default WishlistContextProvider;
