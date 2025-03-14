// Import necessary libraries and components
import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products.jsx";
import Login from "./Components/Login/Login.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Register from "./Components/Register/Register.jsx";
import AuthContextProvider from "./Components/Context/AuthContextProvider.jsx"; // Provides authentication context
import Cart from "./Components/Cart/Cart.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx"; // Protects routes for authenticated users
import { QueryClient, QueryClientProvider } from "react-query"; // For managing server state (API calls)
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./Components/CartContextProvider/CartContextProvider.jsx"; // Provides cart context
import { Toaster } from "react-hot-toast"; // For displaying toast notifications
import Payment from "./Components/Payment/Payment.jsx";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import { Offline } from "react-detect-offline"; // Detects offline status
import Brands from "./Components/Brands/Brands.jsx";
import Home from "./Components/Home/Home.jsx";
import WishList from "./Components/WishList/WishList.jsx";
import WishlistContextProvider from "./Components/WishlistContextProvider/WishlistContextProvider.jsx";
import ProductsByFilter from "./Components/ProductsByFilter/ProductsByFilter.jsx";
import { HelmetProvider } from "react-helmet-async";

// Define the application's routes using createHashRouter
const myRouter = createHashRouter([
  {
    path: "/", // Root path
    element: <Layout />, // Layout component wraps all child routes
    children: [
      { index: "/", element: <Home /> }, // Home page (default route)
      { path: "Products", element: <Products /> }, // Products page
      { path: "Login", element: <Login /> }, // Login page
      { path: "Categories", element: <Categories /> }, // Categories page
      {
        path: "/ProductsByCategory/:id/:name",
        element: <ProductsByFilter filterType={"category"} />,
      },
      { path: "Register", element: <Register /> }, // Register page
      {
        path: "Cart", // Cart page (protected route)
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id", // Product details page (dynamic route)
        element: <ProductDetails />,
      },
      {
        path: "Brands", // Brands page (protected route)
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductsByBrand/:id/:name", // Brands page (protected route)
        element: (
          <ProtectedRoute>
            <ProductsByFilter filterType={"brand"} />
          </ProtectedRoute>
        ),
      },

      {
        path: "Payment", // Payment page (protected route)
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "Orders", // Orders page (protected route)
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "Wishlist", // Wishlist page (protected route)
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "Profile", // Profile page (protected route)
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> }, // 404 page (catch-all route)
    ],
  },
]);

// Create a new QueryClient instance for react-query
const myClinet = new QueryClient();

// Main App component
function App() {
  return (
    <>
      {/* Wrap the app with QueryClientProvider for react-query */}
      <HelmetProvider>
        <QueryClientProvider client={myClinet}>
          {/* Provide authentication context to the app */}
          <AuthContextProvider>
            {/* Provide cart context to the app */}
            <CartContextProvider>
              {/* Provide wishlist context to the app */}
              <WishlistContextProvider>
                {/* RouterProvider renders the app's routes */}
                <RouterProvider router={myRouter} />
              </WishlistContextProvider>
            </CartContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </HelmetProvider>

      {/* Render the Toaster component globally for toast notifications */}
      <Toaster />

      {/* Render the Offline component globally to show offline status */}
      <Offline>
        <div className="text-center bg-dark text-white fixed-bottom">
          It looks like you're offline. Please check your internet connection
          and try again.
        </div>
      </Offline>
    </>
  );
}

export default App;
