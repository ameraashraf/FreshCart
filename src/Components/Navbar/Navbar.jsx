import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/freshcart-logo.svg";
import { useContext } from "react";
import { authContext } from "../Context/AuthContextProvider";
import { cartContext } from "../CartContextProvider/CartContextProvider";
import { wishlistContext } from "../WishlistContextProvider/WishlistContextProvider";

function Navbar() {
  const { token, setToken } = useContext(authContext);

  // use cart context to use the cart number items here in the cart
  const { numberOfCartItems } = useContext(cartContext);

  const { itemsCount } = useContext(wishlistContext);

  //useNavigate
  const navigate = useNavigate();

  //handleLogout
  function handleLogout() {
    setToken("");
    localStorage.removeItem("tkn");
    navigate("/Login");
  }

  //get the userData from authContext -- for profile Name
  //  const { userData } = useContext(authContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-2 fixed-top">
      <Link className="navbar-brand" to="/">
        <img src={Logo} alt="Fresh cart" />
      </Link>
      <button
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
              <Link className="nav-link" to="/Products">
                {" "}
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Categories">
                {" "}
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Brands">
                {" "}
                Brands
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Orders">
                {" "}
                Orders
              </Link>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>

      {/* ----- */}
      <div
        className="collapse navbar-collapse align-items-center "
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav ms-auto ">
          <li className="nav-item position-relative ">
            <Link className="nav-link" to="/Cart">
              {" "}
              <i className="fas fa-cart-plus me-1"></i>
              <span className="badge text-danger position-absolute translate-middle">
                {numberOfCartItems ? numberOfCartItems : ""}
              </span>
            </Link>
          </li>

          {/* wish list */}
          <li className="nav-item position-relative ">
            <Link className="nav-link" to="/Wishlist">
              {" "}
              <i className="fa-solid fa-heart me-1"></i>
              <span className="badge text-danger position-absolute translate-middle">
                {itemsCount ? itemsCount : ""}
              </span>
            </Link>
          </li>

          {/* <li className="nav-item ">
            <ul className="list-unstayled ">
              <li className=" ms-3 fa-brands fa-instagram"></li>
              <li className=" ms-3 fa-brands fa-facebook"></li>
              <li className="ms-3 fa-brands fa-linkedin"></li>
              <li className="ms-3 fa-brands fa-twitter"></li>
            </ul>
          </li> */}

          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/Profile">
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
                <Link className="nav-link" to="/Login">
                  {" "}
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Register">
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
