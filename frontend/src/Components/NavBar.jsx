import cartEmpty from "../assets/cart-empty.png";
import cartFull from "../assets/cart-full.png";
import "../App.css";

export default function NavBar({ quantity }) {
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, username</h3>
      </div>

      <div className="NavDiv NavTitle">
        <h2>Groceries App 🍎</h2>
      </div>

      <div className="NavDiv NavCart">
        <img 
          src={quantity > 0 ? cartFull : cartEmpty} 
          alt="cart"
        />
      </div>
    </nav>
  );
}
