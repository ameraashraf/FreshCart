export default function CartItemRow({
  styles,
  product,
  setRemovingProductId,
  removeProductMutation,
  removingProductId,
  handleUpdateCart,
}) {
  return (
    <div
      className={`row g-sm-1 g-md-4 mb-3 ${styles.productRow}`}
      key={product.product.id}
    >
      <div className="col-md-4">
        <div
          className={`row g-1 align-items-center justify-content-between ${styles.leftSide}`}
        >
          <div className="col-md-3 text-center order-2 order-md-1 mt-0">
            <div
              role="button"
              className="border-0"
              onClick={() => {
                setRemovingProductId(product.product.id); // Set the product ID to be removed
                removeProductMutation.mutate(product.product.id); // Trigger removal of the product
              }}
            >
              {/* Display spinner while removing product or "X" if not */}
              {removingProductId === product.product.id ? (
                <i className="fa-2x fa-solid fa-spinner fa-spin"></i> // Show spinner if product is being removed
              ) : (
                <i className="text-danger fa-2x fa-solid fa-xmark"></i> // Show "X" for remove action
              )}
            </div>
          </div>
          <div className="col-md-9 order-1 order-md-2">
            <figure>
              <img
                className={`${styles.productImage}`}
                src={product.product.imageCover}
                alt={product.product.title} // Image of the product
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="col-md-8 order-3">
        <div className={`${styles.text}`}>
          <h4 className={`mb-md-5 mb-3 pt-0 pt-md-2 ${styles.productTitle}`}>
            {product.product.title} {/* Display product title */}
          </h4>
          <h5 className={`mb-md-5 mb-3 ${styles.productPrice}`}>
            <span className="fw-bold">Price: </span>
            <span className="text-muted">{`$${
              product.count > 0 ? product.price * product.count : product.price
            }`}</span>
            {/* Calculate price based on quantity */}
          </h5>
          <div>
            <div
              className={`mb-3 d-flex align-items-center gap-4 rounded-2 ${styles.buttons}`}
            >
              {/* Button to increase product quantity */}
              <button
                onClick={() => {
                  handleUpdateCart(product.product.id, product.count + 1); // Increment product count
                }}
                className={`border-0 btn ${styles.increment}`}
              >
                +
              </button>
              <p className="p-0 m-0">{product.count}</p>{" "}
              {/* Display the current product quantity */}
              {/* Button to decrease product quantity */}
              <button
                onClick={() => {
                  handleUpdateCart(product.product.id, product.count - 1); // Decrement product count
                }}
                className={`border-0 btn ${styles.decrement}`}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
