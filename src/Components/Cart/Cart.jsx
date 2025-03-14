import { useContext } from "react";
import { cartContext } from "../CartContextProvider/CartContextProvider";
import Loader from "../Loader/Loader";
import styles from "./Cart.module.css";
import CartItems from "../CartItems/CartItems";
import CartSummary from "../CartSummary/CartSummary";
import ContinueShoppingButton from "../ContinueShopping/ContinueShoppingButton";
import { Helmet } from "react-helmet-async";
import NoDataMessage from "../NoDataMesssage/NoDataMessage";

function Cart() {
  // Fetching all products from the cart context
  const { allProducts } = useContext(cartContext);

  //----------------------------------------//
  // If allProducts is not available, show a loading indicator
  if (!allProducts) {
    return <Loader />;
  }

  return (
    <>
      {/* Setting up meta tags for SEO */}
      <Helmet>
        <title>Shopping Cart - FreshCart</title>
        <meta
          name="description"
          content="Review your selected items in your shopping cart at FreshCart. Proceed to checkout for fast delivery and secure payment."
        />
      </Helmet>

      <div className="container">
        {/* Check if there are products in the cart */}
        {allProducts?.length ? (
          <div>
            {/* Header for the cart page with a Continue Shopping button */}
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between py-4 py-md-5 gap-1 ">
              <h1 className={`fw-bold text-md-center ${styles.mainTitle}`}>
                Shopping cart
              </h1>
              <ContinueShoppingButton />
            </div>

            <div className="row">
              {/* Cart Items and Cart Summary Components */}
              <CartItems styles={styles} />
              <CartSummary styles={styles} />
            </div>
          </div>
        ) : (
          <>
            {/* Message when the cart is empty */}
            <div className={`container my-5`}>
              <h1 className={`text-center mb-3`}>Shopping cart</h1>
              <NoDataMessage
                heading={"Your cart is empty"}
                paragraph={"Start adding products to your cart"}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
