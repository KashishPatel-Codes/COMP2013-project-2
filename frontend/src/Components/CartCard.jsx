// Cart card component: shows a single item in the cart with quantity controls
import QuantityCounter from "./QuantityCounter";

export default function CartCard({
  id,
  image,
  productName,
  price,
  quantity,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
}) {
  // Calculate total price for this item
  const totalPrice = (parseFloat(price.replace("$", "")) * quantity).toFixed(2);

  return (
    <div className="CartCard">
      <div className="CartCardInfo">
        <img src={image} alt={productName} />
        <p>{productName}</p>
        <p>{price}</p>

        <QuantityCounter
          id={id}
          productQuantity={quantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          mode="cart"
        />
      </div>

      <div className="CartCardTotal">
        <h3>Total: ${totalPrice}</h3>
        <button onClick={() => handleRemoveFromCart(id)} className="RemoveButton">
          Remove
        </button>
      </div>
    </div>
  );
}
