import { Link } from "react-router-dom";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import styles from "../ProductCard/ProductCard.module.css";
import WishlistToggleButton from "../WishlistToggleButton/WishlistToggleButton";

function WishlistProduct({ wishlistProducts }) {
  console.log(wishlistProducts); // Logging wishlist products for debugging

  return (
    <div className="row gy-4">
      {/* Mapping through wishlist products to display them */}
      {wishlistProducts.map(function (product) {
        return (
          <div className="col-6 col-md-4 col-lg-3" key={product._id}>
            <div className={`p-md-3 p-2 rounded-3 ${styles.productContent}`}>
              {/* Link to product details page */}
              <Link
                to={"/ProductDetails/" + product.id}
                aria-label={`View details for ${product.title}`}
              >
                <img
                  className="w-100 mb-md-3 rounded"
                  src={product.imageCover}
                  alt={product.title}
                />
                <h5 className="text-truncate text-center text-md-start">
                  {product.title}
                </h5>
                <div
                  className={`${styles.priceAndRating} d-flex justify-content-between`}
                >
                  <p>${product.price}</p>
                  <p>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "gold" }}
                    ></i>{" "}
                    {product.ratingsAverage}
                  </p>
                </div>
              </Link>
              {/* Button to add the product to cart */}
              <AddToCartButton
                productId={product._id}
                className={styles.addButton}
              />
              {/* Button to toggle product in/out of wishlist */}
              <WishlistToggleButton productId={product._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WishlistProduct;
