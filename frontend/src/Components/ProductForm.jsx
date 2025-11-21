// Product form component
export default function ProductForm({ isEditing, formData, handleOnChange, handleOnSubmit }) {
  return (
    <div className="ProductForm">
      <h3>Product Form</h3>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleOnChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image Link"
          value={formData.image}
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleOnChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}
