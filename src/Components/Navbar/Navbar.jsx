import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/freshcart-logo.svg";
import { useContext, useRef } from "react";
import { authContext } from "../Context/AuthContextProvider";
import { cartContext } from "../CartContextProvider/CartContextProvider";
import { wishlistContext } from "../WishlistContextProvider/WishlistContextProvider";

function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { numberOfCartItems } = useContext(cartContext);
  const { itemsCount } = useContext(wishlistContext);
  const navigate = useNavigate();

  // Reference to the navbar toggler button
  const navbarTogglerRef = useRef(null);

  // Function to close the navbar
  const closeNavbar = () => {
    if (navbarTogglerRef.current && window.innerWidth < 992) {
      navbarTogglerRef.current.click();
    }
  };

  //handleLogout
  function handleLogout() {
    setToken("");
    localStorage.removeItem("tkn");
    navigate("/Login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-2 fixed-top">
      <Link className="navbar-brand" to="/" onClick={closeNavbar}>
        <img src={Logo} alt="Fresh cart" />
      </Link>
      <button
        ref={navbarTogglerRef}
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        {token ? (
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/Products" onClick={closeNavbar}>
                {" "}
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Categories" onClick={closeNavbar}>
                {" "}
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Brands" onClick={closeNavbar}>
                {" "}
                Brands
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Orders" onClick={closeNavbar}>
                {" "}
                Orders
              </Link>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>

      <div
        className="collapse navbar-collapse align-items-center "
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav ms-auto ">
          <li className="nav-item position-relative ">
            <Link className="nav-link" to="/Cart" onClick={closeNavbar}>
              {" "}
              <i className="fas fa-cart-plus me-1"></i>
              <span className="badge text-danger position-absolute translate-middle">
                {numberOfCartItems ? numberOfCartItems : ""}
              </span>
            </Link>
          </li>

          <li className="nav-item position-relative ">
            <Link className="nav-link" to="/Wishlist" onClick={closeNavbar}>
              {" "}
              <i className="fa-solid fa-heart me-1"></i>
              <span className="badge text-danger position-absolute translate-middle">
                {itemsCount ? itemsCount : ""}
              </span>
            </Link>
          </li>

          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/Profile" onClick={closeNavbar}>
                  {" "}
                  Profile <i className="fa-regular fa-user"></i>{" "}
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" role="button" onClick={handleLogout}>
                  {" "}
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className="nav-item">
                <Link className="nav-link" to="/Login" onClick={closeNavbar}>
                  {" "}
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Register" onClick={closeNavbar}>
                  {" "}
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
