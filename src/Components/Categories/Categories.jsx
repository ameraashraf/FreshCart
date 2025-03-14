import CartList from "../CardList/CardList";
import { Helmet } from "react-helmet-async";

function Categories() {
  return (
    <>
      {/* SEO: Updates the page title and description dynamically */}
      <Helmet>
        <title>Shop by Category - FreshCart</title>
        <meta
          name="description"
          content="Explore a wide range of product categories on FreshCart. Shop groceries, fashion, electronics, and more!"
        />
      </Helmet>

      {/* Reusable component to display categories */}
      <CartList
        title={"categories"}
        ApiUrl={`https://ecommerce.routemisr.com/api/v1/categories`}
        path={"/ProductsByCategory"}
      />
    </>
  );
}

export default Categories;
