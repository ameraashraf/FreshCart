import Logo from "../images/freshcart-logo.svg";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div>
      {" "}
      <div className={`bg-light text-dark pt-4 pb-5  `}>
        <div className="container mb-md-3 md-5  ">
          <div className="row gx-5 gy-2">
            <div className="col-6 col-lg-3">
              <div>
                <img src={Logo} alt="Fresh cart" />
                <p className="pt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="col-6 col-lg-3 ">
              <div className="">
                <h5>About Us</h5>
                <ul className="list-unstyled">
                  <li className="mb-1">About FreshCart</li>
                  <li className="mb-1">Privacy Policy</li>
                  <li className="mb-1">terms & conditions</li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div>
                <h5>Customer care</h5>
                <ul className="list-unstyled">
                  <li className="mb-1">Contact Us</li>
                  <li className="mb-1">Feedback</li>
                  <li className="mb-1">FAQ</li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="">
                <h5>Social media</h5>

                <div className="d-flex gap-4 pt-1  ">
                  <div className={` bg ${styles.socialBox}`}>
                    <i className={`fa-lg fa-brands fa-instagram`}></i>
                  </div>
                  <div className={` bg ${styles.socialBox}`}>
                    <i className=" fa-lg fa-brands fa-square-facebook"></i>
                  </div>
                  <div className={` bg ${styles.socialBox}`}>
                    <i className={`fa-lg fa-brands fa-linkedin`}></i>
                  </div>
                  <div className={` bg ${styles.socialBox}`}>
                    <i className="fa-lg fa-brands fa-square-x-twitter"></i>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light text-dark text-center py-3 border-top border-dark">
        <p className="mb-0">
          © {new Date().getFullYear()} FreshCart. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
