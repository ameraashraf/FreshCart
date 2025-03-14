import styles from "./ProductDetails.module.css"; // Import CSS module for styling

// This component is responsible for rendering the product details UI
function ProductDetailsLayout({ children }) {

  return (
    <div>
      {children}
    </div>
  );
}

export default ProductDetailsLayout;
