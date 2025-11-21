// Product card component
import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  id,
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt={productName} />
      <h4>{brand}</h4>

      <QuantityCounter
        productQuantity={productQuantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />

      <h3>{price}</h3>
      <div>
        <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
        <button onClick={() => handleEdit({ id, productName, brand, image, price })}>
          Edit
        </button>
        <button onClick={() => handleDelete(id)} className="RemoveButton">
          Delete
        </button>
      </div>
    </div>
  );
}
