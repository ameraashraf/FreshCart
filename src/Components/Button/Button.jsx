import { FallingLines } from "react-loader-spinner";
import styles from "./Button.module.css";

function Button({
  isLoading = false,
  text = "Click Me",
  handleOnClick,
  className = "",
  style = {},
  variant = "primary", // "secondary", "danger", etc.
  size = "medium", // "small", "large"
  icon, // Pass an icon component
  disabled = false,
  loader = (
    <FallingLines color="#fff" width="35" visible={true} ariaLabel="Loading" />
  ),
  ...rest
}) {
  return (
    <div className="d-flex">
      <button
        className={` rounded-2 mt-2 flex-grow-1 py-2 
        ${styles.formButton} ${styles[variant]} ${styles[size]} ${className}`}
        type="submit"
        aria-busy={isLoading}
        disabled={isLoading || disabled}
        onClick={handleOnClick}
        style={style}
        {...rest}
      >
        {isLoading ? (
          loader
        ) : (
          <>
            {icon && <span className={styles.icon}>{icon}</span>}
            {text}
          </>
        )}
      </button>
    </div>
  );
}

export default Button;
