import { Helmet } from "react-helmet-async";
import CardList from "../CardList/CardList";

function Brands() {
  return (
    <>
      {/* SEO Metadata using Helmet for better search engine optimization */}
      <Helmet>
        <title>Shop by Brand - FreshCart</title>
        <meta
          name="description"
          content="Discover top brands on FreshCart. Shop your favorite brands in fashion, electronics, beauty, and more!"
        />
      </Helmet>

      {/* Rendering the reusable CardList component for displaying brands */}
      <CardList
        title={"brands"}
        ApiUrl={`https://ecommerce.routemisr.com/api/v1/brands`}
        path={"/ProductsByBrand"}
      />
    </>
  );
}

export default Brands;

