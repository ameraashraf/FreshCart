import { Link } from "react-router-dom";
import styles from "./ContinueShoppingButton.module.css";
function ContinueShoppingButton() {
  return (
    <button className={` border-1 rounded-2   ${styles.shoppingButton}`}>
      <Link to="/Products">
        <i className="fa-solid fa-arrow-left me-2"></i>
        Continue shopping
      </Link>
    </button>
  );
}

export default ContinueShoppingButton;
