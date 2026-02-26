import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AboutUs from "./components/AboutUs";
import Checkout from "./components/checkout";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [page, setPage] = useState("landing");
  const [cartItems, setCartItems] = useState([]);

  // Add to cart helper
  const addToCart = (product) => {
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      const updated = cartItems.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item)
      .filter(item => item.qty > 0);
    setCartItems(updated);
  };

  return (
    <div className="app-container">
      {page !== "landing" && (
        <Navbar setPage={setPage} cartCount={cartItems.length} />
      )}

      {page === "landing" && (
        <div className="background-image">
          <h1 className="main-heading">Paradise Nursery</h1>
          <div className="about-overlay">
            <AboutUs />
          </div>
          <button className="main-button" onClick={() => setPage("products")}>
            Get Started
          </button>
        </div>
      )}

      {page === "products" && (
        <ProductList
          cartItems={cartItems}
          addToCart={addToCart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
        />
      )}

      {page === "cart" && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          setPage={setPage}
        />
      )}

      {page === "checkout" && (
        <Checkout
          cartItems={cartItems}
          setCartItems={setCartItems}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default App;