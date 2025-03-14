import { useParams } from "react-router-dom";

function ProductsByBrand() {
  const { id, name } = useParams();

  return <div>Product by Brand</div>;
}

export default ProductsByBrand;
