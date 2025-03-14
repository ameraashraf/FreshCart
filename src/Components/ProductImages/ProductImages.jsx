import ProductImageSlider from "../ProductImagesSlider/ProductImagesSlider";

function ProductImages({ images }) {
  return (
    <div className="col-md-5">
      <figure className={`h-100`}>
        <ProductImageSlider images={images} />
      </figure>
    </div>
  );
}

export default ProductImages;
