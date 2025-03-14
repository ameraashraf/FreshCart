import { useContext } from "react";
import { cartContext } from "../CartContextProvider/CartContextProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function CartSummary({ styles }) {
  // import data from CartContext
  const { totalCartPrice, clearCart } = useContext(cartContext);

  //handle clear cart
  async function handleClearCart() {
    try {
      const response = await clearCart();
      if (response === "success") {
        toast.success("Cart cleared successfully", {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  }

  return (
    <>
      {" "}
      <div className="col-lg-4 mb-5 ">
        <div className={`rounded-2 ${styles.summary}`}>
          <h2 className="border-bottom pt-2 pb-3 fw-bold">Summary</h2>
          <div>
            <div className="d-flex justify-content-between ">
              <p className="my-1 my-md-2">Subtotal</p>
              <span>${totalCartPrice}</span>
            </div>
            <div className="d-flex justify-content-between ">
              <p className="my-1 my-md-2">Discount</p>
              <span>0%</span>
            </div>
            <div className="d-flex justify-content-between">
              <p className="my-1 my-md-2">Shipping</p>
              <span>Free</span>
            </div>

            <div className="d-flex justify-content-between mt-3 pt-3 border-top">
              <p className="mb-2 mb-md-3">Total</p>
              <span>${totalCartPrice}</span>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-between flex-column flex-md-row">
            <Link to={"/Payment"} className="flex-grow-1">
              <button className="btn btn-dark w-100">Check Payment</button>
            </Link>
            <button
              onClick={handleClearCart}
              className="btn btn-outline-danger px-4  
              "
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSummary;
