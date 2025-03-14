import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../CartContextProvider/CartContextProvider";
import { useMutation } from "react-query";
import CartItemRow from "../CartItemRow/CartItemRow";
function CartItems({ styles }) {
  //import from CartContextProvider
  const { removeProduct, allProducts, updateCart } = useContext(cartContext);
  const [removingProductId, setRemovingProductId] = useState(null);

  //Functions
  // handel update cart
  async function handleUpdateCart(productId, newCount) {
    try {
      const response = await updateCart(productId, newCount);
      if (response.status === "success") {
        toast.success("Product updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
  }

  const removeProductMutation = useMutation(
    async function (productId) {
      const response = await removeProduct(productId);
      return response;
    },
    {
      onSuccess: function (response) {
        if (response.status === "success") {
          toast.success("Product removed successfully");
          setRemovingProductId(null);
        }
      },
      onError: function (error) {
        toast.error("Failed to remove product");
        setRemovingProductId(null);
      },
    }
  );

  return (
    <>
      <div className="col-lg-8 ">
        {allProducts?.map(function (product, index) {
          return (
            <CartItemRow
              styles={styles}
              product={product}
              removingProductId={removingProductId}
              handleUpdateCart={handleUpdateCart}
              removeProductMutation={removeProductMutation}
              setRemovingProductId={setRemovingProductId}
            />
          );
        })}
      </div>
    </>
  );
}

export default CartItems;