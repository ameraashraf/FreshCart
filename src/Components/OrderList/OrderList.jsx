import { Link } from "react-router-dom";

function OrderList({ orders }) {
  return (
    <div className="row gy-5">
      {/* Map through each order in the orders array */}
      {orders?.map(function (order) {
        return (
          <div key={order._id} className="col-md-12">
            {/* Card container for each order */}
            <div className="shadow h-100 card">
              {/* Order Header: Displays order ID and creation date */}
              <div className="card-header bg-white">
                <h3 className="h5 mb-0">Order #{order._id}</h3>
                <small className="text-muted">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </small>
              </div>

              {/* Order Body: Displays all products in the order */}
              <div className="card-body">
                <div className="row g-3">
                  {/* Map through each product in the order's cartItems */}
                  {order.cartItems.map((item) => {
                    return (
                      <div key={item.product.id} className="col-6 col-md-3">
                        {/* Product container */}
                        <div className="text-center">
                          {/* Link to the product details page */}
                          <Link
                            to={"/ProductDetails/" + item.product.id}
                            className=""
                          >
                            {/* Product image */}
                            <img
                              className="img-fluid rounded"
                              src={item.product.imageCover}
                              alt={item.product.title}
                              style={{
                                height: "150px", // Fixed height for consistency
                              }}
                            />

                            {/* Product details */}
                            <div>
                              <h5>
                                {/* Display the first two words of the product title */}
                                {item.product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </h5>
                              <p className="m-0">Price: ${item.price}</p>
                              <p className="m-0">Quantity: {item.count}</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Footer: Displays order summary and shipping details */}
              <div className="card-footer bg-white pt-3 pb-3 mt-3">
                <h4 className="h5 mb-3">Order details</h4>
                <p className="mb-1">
                  <strong>Total price:</strong> ${order.totalOrderPrice}
                </p>

                <p className="mb-1">
                  <strong>Payment method:</strong> {order.paymentMethodType}
                </p>
                <p className="mb-0">
                  Shipping to{" "}
                  <strong className="fw-bolder text-uppercase">
                    {order.shippingAddress.city}
                  </strong>{" "}
                  with phone number{" "}
                  <strong className="fw-bolder">
                    {order.shippingAddress.phone}
                  </strong>
                  {/* Display additional shipping details if available */}
                  {order.shippingAddress.details
                    ? `, with details: ${order.shippingAddress.details}`
                    : ""}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderList;
