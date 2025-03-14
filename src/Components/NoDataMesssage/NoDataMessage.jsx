import ContinueShoppingButton from "../ContinueShopping/ContinueShoppingButton";
import styles from "./NoDataMessage.module.css";

// Displays a message when no data is available. Accepts `heading` and `paragraph` as props.
function NoDataMessage({ heading, paragraph }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="text-muted">{heading}</h4>
      <p>{paragraph}</p>

      <div className="d-flex align-items-center flex-column">
        {/* Button to redirect users to continue shopping */}
        <ContinueShoppingButton />

        {/* Image to visually represent an empty state */}
        <img
          className={`mt-3 mx-auto img-fluid ${styles.emptyBoxImg}`}
          src={require("../AllOrders/empty box.avif")} // Dynamically load image
          alt="Empty Box"
          style={{ objectFit: "contain", maxWidth: "300px" }}
        />
      </div>
    </div>
  );
}

export default NoDataMessage;