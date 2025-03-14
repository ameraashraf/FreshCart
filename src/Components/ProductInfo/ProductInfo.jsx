import AddToCartButton from "../AddToCartButton/AddToCartButton";
import WishlistToggleButton from "../WishlistToggleButton/WishlistToggleButton";
import styles from "../WishlistToggleButton/WishListToggleButton.module.css"; // Import CSS module for styling

function ProductInfo({ product }) {
  const productId = product?.id;
  return (
    <div className="col-md-7 ">
      <figcaption
        className={`d-flex flex-column justify-content-between h-100 gap-2 `}
      >
        <h2 className=" fw-bold">{product.title}</h2>

        {/* Price and rating section */}
        <div className={`d-flex justify-content-between align-items-center   `}>
          {/* Display discounted price if available, otherwise show regular price */}
          {product.priceAfterDiscount ? (
            <div className="d-flex align-items-center gap-2">
              <h6 className="text-decoration-line-through text-muted mb-0">
                ${product.price}
              </h6>
              <h6 className="text-danger mb-0">
                ${product.priceAfterDiscount}
              </h6>
            </div>
          ) : (
            <h6 className="fw-bold">${product.price}</h6>
          )}

          {/* Display product rating */}
          <div className="d-flex align-items-center gap-2">
            <i className="fas fa-star text-warning"></i>
            <span className="fw-bold">{product.ratingsAverage}</span>
          </div>
        </div>

        {/* Product description */}
        <p className="text-muted ">{product.description}</p>

        {/* Buttons for adding to cart and favourites */}
        <div className="d-flex gap-3">
          {/* Add to cart button */}

          <AddToCartButton productId={productId} className={`btn-lg`} />
          {/* Add to favourites button */}

          {/* <AddWishList /> */}
          <WishlistToggleButton
            productId={productId}
            styles={styles.addToFavouritesBtn}
          />
        </div>
      </figcaption>
    </div>
  );
}

export default ProductInfo;
