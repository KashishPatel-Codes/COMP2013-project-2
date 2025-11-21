// Cart container: shows all items in the cart and cart actions
import CartCard from "./CartCard";

export default function CartContainer({
  cartList,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
  handleClearCart,
}) {
  // Calculate total checkout amount
  const totalCheckout = cartList
    .reduce(
      (total, item) => total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    )
    .toFixed(2);

  return (
    <div className="CartContainer">
      <h2>Cart items: {cartList.length}</h2>

      {cartList.length > 0 ? (
        <>
          {cartList.map((product) => (
            <CartCard
              key={product.id}
              {...product}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddQuantity={handleAddQuantity}
              handleRemoveQuantity={handleRemoveQuantity}
            />
          ))}

          <div className="CartListBtns">
            <button onClick={() => handleClearCart()} className="RemoveButton">
              Empty Cart
            </button>
            <button id="BuyButton">
              Checkout: {totalCheckout}
            </button>
          </div>
        </>
      ) : (
        <h3>No items in cart</h3>
      )}
    </div>
  );
}
