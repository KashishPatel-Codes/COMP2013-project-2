// Main app container: handles product CRUD, quantities, and cart
import { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import ProductForm from "./ProductForm";
import NavBar from "./NavBar";
import CartContainer from "./CartContainer";
import "../App.css";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../api";

export default function GroceriesAppContainer() {
  const [productsData, setProductsData] = useState([]);
  const [formData, setFormData] = useState({ id: "", productName: "", brand: "", image: "", price: "" });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    handleProductsDB();
  }, []);

  const handleProductsDB = async () => {
    try {
      const data = await fetchProducts();
      setProductsData(data);
      setProductQuantity(data.map((p) => ({ id: p.id, quantity: 0 })));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const idToUpdate = formData._id || formData.id;
        await updateProduct(idToUpdate, formData);
        setPostResponse("Product updated successfully");
        setIsEditing(false);
      } else {
        await addProduct(formData);
        setPostResponse("Product added successfully");
      }
      setFormData({ id: "", productName: "", brand: "", image: "", price: "" });
      await handleProductsDB();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setFormData({
      id: product.id,
      _id: product._id,
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setPostResponse("Product deleted");
      await handleProductsDB();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      setCartList(cartList.map((p) => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p));
    } else if (mode === "product") {
      setProductQuantity(productQuantity.map((p) => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p));
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      setCartList(cartList.map((p) => p.id === productId && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p));
    } else if (mode === "product") {
      setProductQuantity(productQuantity.map((p) => p.id === productId && p.quantity > 0 ? { ...p, quantity: p.quantity - 1 } : p));
    }
  };

  const handleAddToCart = (productId) => {
    const product = productsData.find((p) => p.id === productId);
    const pQuantity = productQuantity.find((p) => p.id === productId);
    const newCartList = [...cartList];
    const productInCart = newCartList.find((p) => p.id === productId);
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (!pQuantity || pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    setCartList(cartList.filter((p) => p.id !== productId));
  };

  const handleClearCart = () => setCartList([]);

  return (
    <div>
      <NavBar quantity={cartList.length} />
      <div className="GroceriesAppContainer">
        <div className="LeftColumn">
          <ProductForm
            isEditing={isEditing}
            formData={formData}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
          />
          <p className="Message">{postResponse}</p>
          <ProductsContainer
            products={productsData}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            productQuantity={productQuantity}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
