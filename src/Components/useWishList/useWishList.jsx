import { useContext, useState } from "react";
import { authContext } from "../Context/AuthContextProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "react-query";

export default function useWishList() {
  const { token } = useContext(authContext); // Accessing token from context
  const isLoggedIn = !!token; // Checking if the user is logged in
  const [itemsCount, setItemsCount] = useState(); // State for tracking the number of items in the wishlist

  // Function to fetch the user's wishlist
  async function fetchUserWishList() {
    try {
      if (!isLoggedIn) {
        // If not logged in, show an error message
        toast.error("Please log in to add items to your wish list.", {
          icon: "🔒",
        });
        return;
      }

      // Fetch the wishlist data from the API
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers: { token } }
      );
      setItemsCount(response?.data?.count); // Update the count of items
      return response?.data?.data; // Return the wishlist items
    } catch (error) {
      console.log(error); // Log any errors
    }
  }

  // Using react-query to fetch the wishlist only if the user is logged in
  return useQuery(`fetchUserWishList`, fetchUserWishList, {
    enabled: isLoggedIn, // Query will only run if the user is logged in
  });
}
