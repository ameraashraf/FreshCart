import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import WishlistToggleButton from "../WishlistToggleButton/WishlistToggleButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ProductCard({ product }) {
  return (
    <div className="row gy-4">
      {/* Map through the products array and render each product */}
      {product.map(function (product, index) {
        const productId = product.id;
        return (
          <div className="col-6  col-md-4 col-lg-3" key={index}>
            <div className={`p-md-3 p-2 rounded-3  ${styles.productContent} `}>
              <Link
                to={"/ProductDetails/" + product.id}
                aria-label={`View details for ${product.title}`}
              >
                <LazyLoadImage
                  className="w-100 mb-md-3 rounded"
                  src={product.imageCover}
                  alt={product.title}
                  effect="blur"
                  width="100%"
                  height="100%"
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
                  {/* <p>{product.id}</p> */}
                </div>
              </Link>
              {/* Render the AddToCartButton component */}
              <AddToCartButton
                productId={productId}
                className={styles.addButton}
              />
              <WishlistToggleButton
                productId={productId}
                styles={styles.addToFavouritesBtn}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductCard;
