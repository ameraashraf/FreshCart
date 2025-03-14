import { Helmet } from "react-helmet-async";
import CateogrySlider from "../CateogrySlider/CateogrySlider";
import Products from "../Products/Products";
import styles from "./Home.module.css";
function Home() {
  return (
    <>
      <Helmet>
        <title>FreshCart</title>
        <meta
          name="description"
          content="Shop the latest trends in fashion, electronics, and more at [Your Store Name]. Great deals, fast shipping, and top-quality products!"
        />
      </Helmet>
      <div
        className={` d-flex px-5  align-items-center ${styles.homeBackground}`}
      >
        {" "}
        <div
          className={`text-white text-center text-md-start   ${styles.headingTitle}`}
        >
          {" "}
          <h1 className={` `}>Welcome to FreshCart</h1>
          <p className="mt-2 ">
            Your One-Stop Shop for Groceries, Fashion, Electronics & More!
          </p>
        </div>
      </div>{" "}
      <div className="container">
        {/* First Section: Home Slider and Banners */}

        <div className="row gx-0">
          <div className="col-md-3 mb-5 d-none d-md-block"></div>
        </div>
        {/* Category Slider */}
        <CateogrySlider />
        {/* Products Section */}

        <Products />
      </div>
    </>
  );
}

export default Home;
