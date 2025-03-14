import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "../Context/AuthContextProvider";
import toast from "react-hot-toast";

// Create Context for Cart
export const cartContext = createContext();

function CartContextProvider({ children }) {
  // State to store cart details
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState("");
  const [cartId, setCartId] = useState("");

  // Add product to the cart
  async function addProductToCart(productId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      getUserCart(); // Refresh cart details after adding product
      if (response.data.status === "success") {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart.");
      }
      return response.data;
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  }

  // Fetch cart details
  async function getUserCart() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setNumberOfCartItems(response.data.numOfCartItems);
      setTotalCartPrice(response.data.data.totalCartPrice);
      setAllProducts(response.data.data.products);
      setCartId(response.data.data._id);
      localStorage.setItem("userId", response.data.data.cartOwner); // Store cart owner ID
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  // Use Context to check if the user is logged in
  const { token } = useContext(authContext);

  // Fetch cart details on login/logout
  useEffect(() => {
    getUserCart();
  }, [token]);

  // Update product quantity in the cart
  async function updateCart(productId, newCount) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setNumberOfCartItems(response.data.numOfCartItems);
      setTotalCartPrice(response.data.data.totalCartPrice);
      setAllProducts(response.data.data.products);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Remove product from the cart
  async function removeProduct(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setNumberOfCartItems(response.data.numOfCartItems);
      setTotalCartPrice(response.data.data.totalCartPrice);
      setAllProducts(response.data.data.products);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Clear the entire cart
  async function clearCart() {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setNumberOfCartItems(0);
      setTotalCartPrice("");
      setAllProducts([]);
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        numberOfCartItems,
        totalCartPrice,
        allProducts,
        updateCart,
        removeProduct,
        clearCart,
        cartId,
        getUserCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;
